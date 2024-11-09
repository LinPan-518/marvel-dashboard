import { ResponseSchema, Thumbnail } from "@/@types/response";

export type OrderType =
  | "focDate"
  | "onsaleDate"
  | "title"
  | "issueNumber"
  | "modified"
  | "-focDate"
  | "-onsaleDate"
  | "-title"
  | "-issueNumber"
  | "-modified";

// comic
export type ComicResponse = ResponseSchema<Comic>;

export type Comic = {
  id: number;
  title: string;
  dates: Date[];
  thumbnail: Thumbnail;
};

export type Date = {
  type: string;
  date: string;
};
