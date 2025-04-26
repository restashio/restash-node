import { RestashErrorResponse } from "../../error";

export type UploadFileResponseSuccess = {
  id: string;
  name: string;
  size: number;
  contentType: string;
  key: string;
  url: string;
};

export type UploadFileResponse = {
  data: UploadFileResponseSuccess | null;
  error: RestashErrorResponse | null;
};

export type UploadOptions = {
  /**
   * Optional to override the file name.
   * If not provided, the original file name will be used.
   * If the file is a blob and this is not provided, we will generate a random string.
   */
  name?: string;

  /**
   * Optional path to upload the file to.
   * This will determine the folder or directory the file is uploaded to.
   */
  path?: string;
};

export type UploadRequest = {
  file: File | Blob;
  options?: { name?: string; path?: string };
};
