import axios from "axios";
import { getRedirectUrl } from "../utils";
const AUTH_SUCCESS = "AUTH_SUCCESS";
const ERROR_MSG = "ERROR_MSG";
const LOAD_DATA = "LOAD_DATA";

const initialState = {
  user: "",
  type: "",
  errorMsg: "",
  redirectTo: ""
};

export function user(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        redirectTo: getRedirectUrl(action.payload),
        errorMsg: "",
        ...action.payload
      };
    case LOAD_DATA:
      return {
        ...state,
        ...action.payload
      };
    case ERROR_MSG:
      return { ...state, isAuth: false, errorMsg: action.payload };
    default:
      return state;
  }
}

export function errorMsg(data) {
  return { type: ERROR_MSG, payload: data };
}
export function loadData(data) {
  return { type: LOAD_DATA, payload: data };
}
export function authSuccess(data) {
    console.log(data)
  return { type: AUTH_SUCCESS, payload: data };
}

export function register({ user, type, pwd, repeatPwd }) {
  if (!user || !pwd || !type) {
    return errorMsg("信息不完整");
  }
  if (pwd !== repeatPwd) {
    return errorMsg("密码不一致");
  }

  return dispatch => {
    axios.post("/user/register", { user, type, pwd }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess({ user, type, pwd }));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}
export function login({ user, pwd }) {
  if (!user || !pwd) {
    return errorMsg("请输入用户名或密码");
  }
  return dispatch => {
    axios.post("/user/login", { user, pwd }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}

export function getUserInfo({ callback }) {
  return dispatch => {
    axios.get("/user/info").then(res => {
      if (res.data.code === 0) {
        dispatch(loadData(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
      callback && callback(res);
    });
  };
}

export function update(data) {
  return dispatch => {
    axios.post("/user/update", data).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}
