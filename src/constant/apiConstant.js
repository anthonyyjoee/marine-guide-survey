export const STATUS_CODES = {
  // Success Codes
  SUCCESS: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
  },
  // Error Codes
  ERROR: {
    UNAUTHORIZED: 401,
    SERVER_ERROR: 500,
  },
};

export const API_REQUEST_METHODS = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

export const API_PATH = {
  PUBLIC: {
    LOGIN: "/login",
  },
  SECURE: {
    USER: "/user",
    CHANGE_PASSWORD: "/change-password",
    STAFF: {
      ROOT: "/staff",
      ID: (id) => `/staff/${id}`,
      FILTER: (data) => `/staff${"?" + new URLSearchParams(data).toString()}`,
      RESET_PASSWORD: (id) => `/staff/reset-password/${id}`,
    },
    WORK_UNIT: {
      ROOT: "/work-unit",
      ID: (id) => `/work-unit/${id}`,
      FILTER: (data) => `/work-unit${"?" + new URLSearchParams(data).toString()}`,
    },
    TOOLS: {
      ROOT: "/tools",
      ID: (id) => `/tools/${id}`,
      FILTER: (data) => `/tools${"?" + new URLSearchParams(data).toString()}`,
    },
    SURVEY: {
      ROOT: "/survey",
      ID: (id) => `/survey/${id}`,
      FILTER: (data) => `/survey${"?" + new URLSearchParams(data).toString()}`,
    },
    REPORT: {
      ROOT: "/report",
      ID: (id) => `/report/${id}`,
      FILTER: (data) => `/report${"?" + new URLSearchParams(data).toString()}`,
    },
  },
};

export const ERROR_MESSAGE = {
  INVALID_EMAIL_OR_PASSWORD: "Password atau email salah",
  INVALID_PASSWORD: "Password tidak sesuai",
  EMAIL_IS_REQUIRED: "Email tidak boleh kosong",
  INTERNAL_SERVER_ERROR: "Sedang terjadi kesalahan",
  ALL_FIELD_MUST_BE_FILLED_IN: "Semua data harus diisi",
  PASS_TOO_SHORT: "password membutuhkan setidaknya 8 karakter",
  SUCCESS_ADD_NEW_STAFF: "SUCCESS_ADD_NEW_STAFF",
  UNAUTHORIZED: "UNAUTHORIZED",
  INVALID_ACCESS_TOKEN: "INVALID_ACCESS_TOKEN",
  FORBIDDEN: "FORBIDDEN",
};
