export interface ApiPagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
}

export interface ApiConfig {
  iiif_url: string;
  website_url: string;
}

export interface ApiListResponse<T> {
  pagination: ApiPagination;
  data: T[];
  config: ApiConfig;
}

export interface ApiSingleResponse<T> {
  data: T;
  config: ApiConfig;
}
