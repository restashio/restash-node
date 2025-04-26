import { Restash } from "../../restash";
import { enableFetchMocks } from "jest-fetch-mock";
import { UploadFileResponseSuccess } from "../types/upload-file";

enableFetchMocks();

const restash = new Restash("sk_test_123");
const file = new File(["test"], "test.txt", { type: "text/plain" });

describe("Files", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should upload a file", async () => {
    const response: UploadFileResponseSuccess = {
      id: "file_123",
      name: "test.txt",
      size: 123,
      contentType: "text/plain",
      key: "test.txt",
      url: "https://cdn.restash.io/test.txt",
    };

    fetchMock.mockOnce(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

    const result = await restash.files.upload(file);
    expect(result.data).toEqual(response);
    expect(result.error).toBeNull();
  });

  it("should handle upload error response", async () => {
    const response = {
      error: { code: "bad_request", message: "Invalid file" },
    };

    fetchMock.mockOnce(JSON.stringify(response), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });

    const result = await restash.files.upload(file);
    expect(result.data).toBeNull();
    expect(result.error).toEqual({
      code: "bad_request",
      message: "Invalid file",
    });
  });

  it("should retrieve a file", async () => {
    const response: UploadFileResponseSuccess = {
      id: "file_123",
      name: "test.txt",
      size: 123,
      contentType: "text/plain",
      key: "test.txt",
      url: "https://cdn.restash.io/test.txt",
    };

    fetchMock.mockOnce(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

    const result = await restash.files.retrieve({ id: "file_123" });
    expect(result.data).toEqual(response);
    expect(result.error).toBeNull();
  });

  it("should handle retrieve error", async () => {
    const response = {
      error: { code: "not_found", message: "File not found" },
    };

    fetchMock.mockOnce(JSON.stringify(response), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });

    const result = await restash.files.retrieve({ id: "file_123" });
    expect(result.data).toBeNull();
    expect(result.error).toEqual({
      code: "not_found",
      message: "File not found",
    });
  });

  it("should throw error if no id or key is passed to retrieve", async () => {
    await expect(restash.files.retrieve({})).rejects.toThrow(
      "No id or key provided.",
    );
  });

  it("should delete a file", async () => {
    const response = {
      deleted: true,
      file: "file_123",
    };

    fetchMock.mockOnce(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

    const result = await restash.files.delete({ id: "file_123" });
    expect(result.data).toEqual(response);
    expect(result.error).toBeNull();
  });

  it("should handle delete error", async () => {
    const response = {
      error: { code: "not_found", message: "File not found" },
    };

    fetchMock.mockOnce(JSON.stringify(response), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });

    const result = await restash.files.delete({ id: "file_123" });
    expect(result.data).toBeNull();
    expect(result.error).toEqual({
      code: "not_found",
      message: "File not found",
    });
  });

  it("should throw error if no id or key is passed to delete", async () => {
    await expect(restash.files.delete({})).rejects.toThrow(
      "No id or key provided.",
    );
  });
});
