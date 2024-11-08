export interface Thumbnail {
  extension: string;
  path: string;
}

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

export type ResponseSchema<Result> = {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: Data<Result>;
};

export type CharactersResponse = ResponseSchema<Character>;

export type Data<Result> = {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Result[];
};

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

export interface TableHeader {
  label: string;
  sortable: boolean;
  key: string;
}

interface Url {
  type: string;
  url: string;
}

// export interface MarvelResponseData<T> {
//   total: number;
//   results: T[];
// }

// export interface MarvelResponse<T> {
//   attributionText: string;
//   data: MarvelResponseData<T>;
// }
