const BASE_URL = "https://norma.education-services.ru/api";

export const INGREDIENTS_ENDPOINT = "/ingredients";
export const ORDERS_ENDPOINT = "/orders";

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => {
    throw new Error(err.message || "Неизвестная ошибка :(");
  });
};

export const request = (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  return fetch(url, options).then(checkResponse);
};
