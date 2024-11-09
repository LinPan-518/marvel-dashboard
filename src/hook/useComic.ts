import useSWR from "swr";
import { ComicResponse } from "@/@types/comics";

import apiClient from "@/services/apiClient";
import { COMICS_BASE_URL } from "@/services/apiUrl";

const fetcher = (url: string) => apiClient.get(url).then((res) => res.data);

export const useComic = (id: string) => {
  const { data, error } = useSWR<ComicResponse>(`${COMICS_BASE_URL}/${id}`, fetcher);

  return {
    data: data?.data.results || [],
    isLoading: !error && !data,
    isError: error,
  };
};
