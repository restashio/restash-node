import { version } from "../package.json";
import { Files } from "./files/files";
import { fallbackError, RestashErrorResponse } from "./error";

const baseUrl = "https://api.restash.io/v1";

export class Restash {
  private readonly headers: Headers;

  readonly files = new Files(this);

  constructor(private readonly secretKey: string) {
    if (!secretKey) {
      throw new Error(
        "Missing secret key. Pass it to your Restash constructor. new Restash(secretKey)",
      );
    }

    this.headers = new Headers({
      "Content-Type": "application/json",
      "User-Agent": `restash-node/${version}`,
      Authorization: `Bearer ${secretKey}`,
    });
  }

  private async fetchRequest<T>(
    path: string,
    options: RequestInit = {},
  ): Promise<{
    data: T | null;
    error: RestashErrorResponse | null;
  }> {
    try {
      const response = await fetch(`${baseUrl}${path}`, options);

      if (!response.ok) {
        try {
          const rawError = await response.text();
          const parsedError = JSON.parse(rawError);

          if (parsedError?.error?.code && parsedError?.error?.message) {
            return { data: null, error: parsedError.error };
          }
        } catch (err) {
          const error: RestashErrorResponse = fallbackError;

          if (err instanceof Error) {
            return {
              data: null,
              error: {
                code: error.code,
                message: err.message || error.message,
              },
            };
          }

          return { data: null, error };
        }

        return { data: null, error: fallbackError };
      }

      const data = await response.json();
      return { data, error: null };
    } catch {
      return { data: null, error: fallbackError };
    }
  }

  async get<T>(path: string, options: RequestInit = {}) {
    const requestOptions = {
      method: "GET",
      headers: this.headers,
      ...options,
    };

    return this.fetchRequest<T>(path, requestOptions);
  }

  async post<T>(path: string, body: unknown, options: RequestInit = {}) {
    const isFormData = body instanceof FormData;

    const requestOptions = {
      method: "POST",
      headers: isFormData
        ? {
            Authorization: `Bearer ${this.secretKey}`,
            "User-Agent": `restash-node/${version}`,
          }
        : this.headers,
      body: isFormData ? body : JSON.stringify(body),
      ...options,
    };

    return this.fetchRequest<T>(path, requestOptions);
  }

  async delete<T>(path: string, options: RequestInit = {}) {
    const requestOptions = {
      method: "DELETE",
      headers: this.headers,
      ...options,
    };

    return this.fetchRequest<T>(path, requestOptions);
  }
}
