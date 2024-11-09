import { useCallback } from "react";
import useSWRInfinite from "swr/infinite";

import { PAGE_LIMIT } from "@/lib/constants";
import { Comic } from "@/@types/comics";
import apiClient from "@/services/apiClient";
import { COMICS_BASE_URL } from "@/services/apiUrl";

const fetcher = (url: string) =>
  apiClient
    .get(url)
    .then((res) => res.data)
    .then((res) => res.data.results);

export const useComics = (searchString: string, orderBy: string) => {
  const getKey = useCallback(
    (pageIndex: number, previousPageData: any) => {
      if (previousPageData && !previousPageData.length) return null;
      const url = `${COMICS_BASE_URL}?orderBy=${orderBy}&offset=${pageIndex * PAGE_LIMIT}&limit=${PAGE_LIMIT}`;
      if (searchString === "") {
        return url;
      }
      return `${url}&titleStartsWith=${searchString}`;
    },
    [searchString, orderBy]
  );

  const { data, error, size, setSize, isLoading, isValidating } = useSWRInfinite<Comic[]>(getKey, fetcher);

  return {
    data,
    error,
    size,
    setSize,
    isLoading,
    isValidating,
  };
};
