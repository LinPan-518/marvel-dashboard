import useSWR from "swr";
import { CharactersResponse } from "@/@types/character";
import apiClient from "@/services/apiClient";
import { CHARACTERS_BASE_URL } from "@/services/apiUrl";

const fetcher = (url: string) => apiClient.get(url).then((res) => res.data);

export const useCharacter = (id: string) => {
  const { data, error } = useSWR<CharactersResponse>(`${CHARACTERS_BASE_URL}/${id}`, fetcher);

  return {
    data: data?.data.results || [],
    isLoading: !error && !data,
    isError: error,
  };
};
