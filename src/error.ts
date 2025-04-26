export const RESTASH_ERROR_CODES = {
  bad_request: 400,
  unauthorized: 401,
  forbidden: 403,
  not_found: 404,
  conflict: 409,
  rate_limit_exceeded: 429,
  internal_server_error: 500,
} as const;

export type RestashErrorCode = keyof typeof RESTASH_ERROR_CODES;

export type RestashErrorResponse = {
  code: RestashErrorCode;
  message: string;
};

export const fallbackError: RestashErrorResponse = {
  code: "internal_server_error",
  message: "An internal server error occurred. Please try again later.",
};
