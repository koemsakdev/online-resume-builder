export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
  AUTH: {
    LOGIN: `/api/auth/login`,
    LOGOUT: `/api/auth/logout`,
    REGISTER: `/api/auth/register`,
    GOOGLE: `/api/auth/google`,
    SOCIAL_LOGIN: `/api/auth/social-login`,
    GET_PROFILE: `/api/auth/profile`,
  },
  RESUME: {
    CREATE: "/api/resume",
    GET_ALL: "/api/resume",
    GET_BY_ID: (id: string) => `/api/resume/${id}`,
    UPDATE: (id: string) => `/api/resume/${id}`,
    DUPLICATE: (id: string) => `/api/resume/${id}/duplicate`,
    DELETE: (id: string) => `/api/resume/${id}`,
    UPLOAD_IMAGE: (id: string) => `/api/resume/${id}/upload-image`,
  },
  AI: {
    GENERATE_DESCRIPTION: "/api/ai/generate-description",
    CHAT: "/api/ai/chat",
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image",
  },
};

