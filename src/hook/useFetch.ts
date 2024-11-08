import useSWR, { SWRResponse } from "swr";
import { MarvelResponse, MarvelResponseData } from "../lib/types";

// Define a fetcher function that retrieves JSON data and returns the MarvelResponse format
const fetcher = async <T>(url: string): Promise<MarvelResponseData<T>> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch data");

  if (response.status >= 400 && response.status <= 499) {
    throw new Error("API Client Error");
  }

  const jsonData: MarvelResponse<T> = await response.json();
  return jsonData.data; // Return only the `data` field
};

interface UseFetchProps {
  url: string;
}

export const useFetch = <T>({ url }: UseFetchProps) => {
  const {
    data,
    error,
    isLoading,
  }: SWRResponse<MarvelResponseData<T>, any> = useSWR<MarvelResponseData<T>>(url, fetcher, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Never retry on 404.
      if (error.status === 404) return;
      if (error.status === 429) return;

      // Never retry for a specific key.
      if (key === "/api/user") return;

      // Only retry up to 10 times.
      if (retryCount >= 10) return;

      // Retry after 5 seconds.
      setTimeout(() => revalidate({ retryCount }), 5000);
    },
  });

  const results = data?.results || ([] as T[]); // Access results within MarvelResponseData
  const total = data?.total ?? 0;

  return {
    results,
    total,
    error,
    isLoading: isLoading && !data && !error, // Indicate loading status based on data presence
  };
};
