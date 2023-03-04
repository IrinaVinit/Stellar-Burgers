import {
  setUser,
  sentEmail,
  changePassword,
  login,
  getUserRequest,
} from "../../components/utils/data";
import { getCookie } from "../../components/utils/cookie";


export const REGISTRATION_REQUEST = "REGISTRATION_REQUEST";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

// export const LOGOUT = 'LOGOUT';
// export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
// export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";

// export const AUTH_CHECKED = "AUTH_CHECKED";

export function registrateUser(userData, navigate) {
  return function (dispatch) {
    dispatch({ type: REGISTRATION_REQUEST });
    setUser(userData)
      .then((res) => {
        if (res.success) {
          console.log(res);
          dispatch({ type: REGISTRATION_SUCCESS, payload: res });
          navigate("/login");
        }
        localStorage.setItem("refreshToken", res.refreshToken);
      })
      .catch((err) => {
        console.log(`Ошибка регистрации ${err}`);
        dispatch({
          type: REGISTRATION_FAILED,
        });
      });
  };
}

export function forgotPassword(userEmail, navigate) {
  return function (dispatch) {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    sentEmail(userEmail)
      .then((res) => {
        if (res.success) {
          console.log(res);
          dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: res });
          navigate("/reset-password");
        }
      })
      .catch((err) => {
        console.log(`Ошибка cброса пароля ${err}`);
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
        });
      });
  };
}

export function setNewPassword(newData, navigate) {
  return function (dispatch) {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    changePassword(newData)
      .then((res) => {
        if (res.success) {
          console.log(res);
          dispatch({ type: RESET_PASSWORD_SUCCESS });
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(`Ошибка восстановления пароля ${err}`);
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
      });
  };
}

export function isAutn(data, navigate) {
  return function (dispatch) {
    dispatch({ type: LOGIN_REQUEST });
    login(data)
      .then((res) => {
        if (res.success) {
          console.log(res);
          dispatch({ type: LOGIN_SUCCESS, payload: res });
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(`Ошибка авторизации ${err}`);
        dispatch({
          type: LOGIN_FAILED,
        });
      });
  };
}

export function getUserData() {
  return function (dispatch) {
    dispatch({ type: GET_USER_REQUEST });
    return getUserRequest()
      .then((res) => {
        if (res.success) {
          console.log(res);
          dispatch({ type: GET_USER_SUCCESS, payload: res.user });
        }
      })
      .catch((err) => {
        console.log(`Ошибка получения данных ${err}`);
        dispatch({
          type: GET_USER_FAILED,
          payload: err.message,
        });
      });
  };
}

export const checkAuth = () => (dispatch) => {
  if (getCookie("accessToken")) {
    dispatch(getUserData()).finally(() => {
      // dispatch({
      //   type: AUTH_CHECKED,
      // });
    });
  } else {
    // dispatch({
    //   type: AUTH_CHECKED,
    // });
  }
};
