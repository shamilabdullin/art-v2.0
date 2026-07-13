import { API_BASE_URL } from "./config";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

interface ApiFetchOptions {
  searchParams?: URLSearchParams;
  /** Секунды ревалидации ISR-кэша Next.js (только для запросов на сервере). */
  revalidate?: number | false;
  signal?: AbortSignal;
}

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const { searchParams, revalidate, signal } = options;

  const url = new URL(path, API_BASE_URL);
  if (searchParams) {
    url.search = searchParams.toString();
  }

  const response = await fetch(url, {
    signal,
    next: revalidate === undefined ? undefined : { revalidate },
  });

  if (!response.ok) {
    throw new ApiError(`Запрос к ${url.pathname} завершился ошибкой ${response.status}`, response.status);
  }

  return response.json() as Promise<T>;
}
