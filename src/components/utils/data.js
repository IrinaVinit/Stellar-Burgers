import { getCookie, setCookie } from "../../components/utils/cookie";

export const url = "https://norma.nomoreparties.space/api";

export const URL = {
    
  ingredients: 'https://norma.nomoreparties.space/api/ingredients',
  orders: 'https://norma.nomoreparties.space/api/orders',
  forgotPassword: 'https://norma.nomoreparties.space/api/password-reset',
  resetPassword: 'https://norma.nomoreparties.space/api/password-reset/reset',
  register: 'https://norma.nomoreparties.space/api/auth/register',
  login: 'https://norma.nomoreparties.space/api/auth/login',
  user: 'https://norma.nomoreparties.space/api/auth/user',
  logout: 'https://norma.nomoreparties.space/api/auth/logout',
  token: 'https://norma.nomoreparties.space/api/auth/token'
};




export function checkResponse(res) {
  return res.ok
    ? res.json()
    : Promise.reject(`Что-то пошло не так: ${res.status}` );
}

export function getData() {
  return fetch(URL.ingredients).then(checkResponse);
}

export function getOrderNumber(data) {
  return fetch(URL.orders, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: data,
    }),
  }).then(checkResponse);
}

export function setUser(data) {
  return fetch(URL.register, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
}

export function resetPassword(data) {
  return fetch(URL.forgotPassword, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
}

export function changePassword(data) {
  return fetch(URL.resetPassword, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
}

export function login(data) {
  return fetch(URL.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
}

export function getUserApi() {
  return fetch(URL.user, {
    headers: {
      authorization: getCookie("accessToken"),
    },
  }).then((data)=>checkResponse(data));
}

export function patchUserData(userData) {
  return fetch(URL.user, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: getCookie("accessToken"),
    },
    body: JSON.stringify(userData),
  }).then((data)=>checkResponse(data));
}

export function refreshTokenApi() {
  return fetch(URL.token, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then((res) => {
    console.log(res);
    // if(!res.ok ) {

    // }
      setCookie('accessToken', res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
  }
).catch()
}

export function logout(refreshToken) {
  return fetch(URL.logout, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: refreshToken }),
  }).then(checkResponse);
}

export const getStore = (store) => store;
export const getStoreIngredients = (store) => store.ingredients;
export const getStoreBurgerConstructor = (store) => store.burgerConstructor;
export const getUser = (store) => store.user;
export const getcurrentIngredient = (store) => store.currentIngredient
export const getorder = (store) => store.order;
export const getactiveTab = (store) => store.activeTab;
