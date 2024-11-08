import { CharactersResponse } from "@/lib/types";
import axios from "../api-client";

const DEFAULT_LIMIT = 20;
export type GetCharactersParameters = {
  name?: string;
  orderBy?: "name" | "-name" | "modified" | undefined;
  limit?: number;
  offset?: number;
};

export async function getCharacters({ name, orderBy, offset, limit = DEFAULT_LIMIT }: GetCharactersParameters) {
  return axios
    .get<CharactersResponse>("/characters", {
      params: {
        nameStartsWith: name,
        orderBy,
        limit,
        offset,
      },
    })
    .then(({ data }) => data);
}

export async function getCharacterById(id: number) {
  return axios.get<CharactersResponse>(`/characters/${id}`).then(({ data }) => data);
}
