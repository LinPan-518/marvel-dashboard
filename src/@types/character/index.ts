import { ResponseSchema, Thumbnail } from "@/@types/response";

export interface Character {
  id: string;
  name: string;
  description: string;
  thumbnail: Thumbnail;
  modified: string;
  resourceURI: string;
  urls: Url[];
  comics: Comics;
  series: Series;
  stories: Stories;
  events: Events;
}

export type CharactersResponse = ResponseSchema<Character>;

export type Comics = {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
};

export type Item = {
  resourceURI: string;
  name: string;
  type?: string;
};

export type Series = {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
};

export type Stories = {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
};

export type Events = {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
};

interface Url {
  type: string;
  url: string;
}

export type OrderType = "name" | "-name" | "modified" | undefined;
