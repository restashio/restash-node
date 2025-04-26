import { RestashErrorResponse } from "../../error";

export type RetrieveFileOptions = {
  /**
   * The ID of the file to retrieve.
   */
  id?: string;

  /**
   * The key of the file to retrieve.
   */
  key?: string;
};

export type RetrieveFileResponseSuccess = {
  /**
   * The URL of the file.
   */
  url: string;

  /**
   * The content type of the file.
   */
  contentType: string;

  /**
   * The size of the file in bytes.
   */
  size: number;

  /**
   * The name of the file.
   */
  name: string;

  /**
   * The ID of the file.
   */
  id: string;

  /**
   * The key of the file.
   */
  key: string;
};

export type RetrieveFileResponse = {
  /**
   * The data of the file.
   */
  data: RetrieveFileResponseSuccess | null;

  /**
   * The error response if any.
   */
  error: RestashErrorResponse | null;
};
