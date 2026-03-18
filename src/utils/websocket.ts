const WS_BASE_URL = "wss://norma.education-services.ru";

export const WS_ENDPOINTS = {
  all: `${WS_BASE_URL}/orders/all`,
  user: `${WS_BASE_URL}/orders`,
} as const;
export type WSEndpoint = keyof typeof WS_ENDPOINTS;
