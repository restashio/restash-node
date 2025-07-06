import { Restash } from "../restash";
import {
  UploadFileResponse,
  UploadFileResponseSuccess,
  UploadOptions,
} from "./types/upload-file";
import {
  RetrieveFileOptions,
  RetrieveFileResponse,
} from "./types/retrieve-file";
import { randomBytes } from "node:crypto";
import { DeleteFIleOptions, DeleteFileResponse } from "./types/delete-file";

export class Files {
  private readonly restash: Restash;

  constructor(restash: Restash) {
    this.restash = restash;
  }

  /**
   * Upload a file to Restash.
   * @param file The file to upload.
   * @param options The options for the upload.
   * @returns The response from the upload.
   */
  async upload(
    file: File | Blob,
    options: UploadOptions = {},
  ): Promise<UploadFileResponse> {
    if (!(file instanceof Blob)) {
      throw new Error("File must be an instance of Blob or File");
    }

    if (file.size > 4 * 1024 * 1024) {
      throw new Error(
        "File size exceeds 4MB. Use our client SDK @restash/client for larger files.",
      );
    }

    const formData = new FormData();
    formData.append("file", file);

    if (options.name) {
      formData.append("name", options.name);
    } else {
      if (!(file instanceof File)) {
        // blob is passed in without a name, generate a random name
        formData.append("name", `${randomBytes(8).toString("hex")}`);
      }
    }
    if (options.path) {
      formData.append("path", options.path);
    }

    if (options.metadata) {
      formData.append("metadata", JSON.stringify(options.metadata));
    }

    return await this.restash.post<UploadFileResponseSuccess>(
      "/files/upload",
      formData,
    );
  }

  /**
   * Retrieve a file's metadata in Restash. Either id or key must be provided.
   * @param id The file id.
   * @param key The file key.
   * @returns The response from the upload.
   */
  async retrieve({
    id,
    key,
  }: RetrieveFileOptions): Promise<RetrieveFileResponse> {
    if (!id && !key) {
      throw new Error("No id or key provided.");
    }

    const searchParams = new URLSearchParams({
      ...(id && { id }),
      ...(key && { key }),
    });

    return await this.restash.get(`/files/retrieve?${searchParams.toString()}`);
  }

  /**
   * Delete a file from Restash. Either id or key must be provided.
   * @param id The file id.
   * @param key The file key.
   * @returns The response from the upload.
   */
  async delete({ id, key }: DeleteFIleOptions): Promise<DeleteFileResponse> {
    if (!id && !key) {
      throw new Error("No id or key provided.");
    }

    const searchParams = new URLSearchParams({
      ...(id && { id }),
      ...(key && { key }),
    });

    return await this.restash.delete(
      `/files/delete?${searchParams.toString()}`,
    );
  }
}
