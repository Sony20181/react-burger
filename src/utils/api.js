const BASE_URL = "https://norma.education-services.ru/api";

export const INGREDIENTS_ENDPOINT = "/ingredients";
export const ORDERS_ENDPOINT = "/orders";
export const PASSWORD_FORGOT_ENDPOINT = `/password-reset`; // восстановление пароля
export const PASSWORD_RESET_ENDPOINT = `/password-reset/reset`; // сброс пароля
export const AUTH_REGISTER_ENDPOINT = `/auth/register`; // регистрация
export const LOGIN_ENDPOINT = `/auth/login`; // страница логина
export const LOGOUT_ENDPOINT = `/auth/logout`;
export const TOKEN_UPDATE_ENDPOINT = `/auth/token`;
export const INFO_USER_ENDPOINT = `/auth/user`; // информация пользователя

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
