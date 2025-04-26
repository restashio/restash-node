import { RestashErrorResponse } from "../../error";

export type DeleteFIleOptions = {
  id?: string;
  key?: string;
};

export type DeleteFileSuccessResponse = {
  deleted: boolean;
  file: string;
};

export type DeleteFileResponse = {
  data: DeleteFileSuccessResponse | null;
  error: RestashErrorResponse | null;
};
