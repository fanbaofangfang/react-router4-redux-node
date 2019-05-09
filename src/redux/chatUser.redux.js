import axios from "axios";
import { errorMsg } from "./user.redux";

const USER_LIST = "USER_LIST";

const initialState = {
  userList: []
};
export function chatUser(state = initialState, action) {
  switch (action.type) {
    case USER_LIST:
      return { ...state, userList: action.payload };
    default:
      return state;
  }
}

export function userList(data) {
  return { type: USER_LIST, payload: data };
}
export function getUserList({ type }) {
  return dispatch => {
    axios.get("/user/list", {params:{ type} }).then(res => {
      if(res.status === 200 && res.data.code === 0) {
          dispatch(userList(res.data.data))
      } else {
          dispatch(errorMsg("请求错误"))
      }
    });
  };
}
