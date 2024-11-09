import { useCallback } from "react";
import useSWRInfinite from "swr/infinite";

import { PAGE_LIMIT } from "@/lib/constants";
import { Character } from "@/@types/character";
import apiClient from "@/services/apiClient";
import { CHARACTERS_BASE_URL } from "@/services/apiUrl";

const fetcher = (url: string) =>
  apiClient
    .get(url)
    .then((res) => res.data)
    .then((res) => res.data.results);

export const useCharacters = (searchString: string, orderBy: string) => {
  const getKey = useCallback(
    (pageIndex: number, previousPageData: any) => {
      if (previousPageData && !previousPageData.length) return null;
      const url = `${CHARACTERS_BASE_URL}?orderBy=${orderBy}&offset=${pageIndex * PAGE_LIMIT}&limit=${PAGE_LIMIT}`;
      if (searchString === "") {
        return url;
      }
      return `${url}&nameStartsWith=${searchString}`;
    },
    [searchString, orderBy]
  );

  const { data, error, size, setSize, isLoading, isValidating } = useSWRInfinite<Character[]>(getKey, fetcher);

  return {
    data,
    error,
    size,
    setSize,
    isLoading,
    isValidating,
  };
};
