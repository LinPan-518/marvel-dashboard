export type ResponseSchema<Result> = {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: Data<Result>;
};

export type Data<Result> = {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Result[];
};

export interface Thumbnail {
  extension: string;
  path: string;
}

export interface TableHeader {
  label: string;
  sortable: boolean;
  sortKey?: string;
  defaultSort?: boolean;
}
