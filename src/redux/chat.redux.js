import axios from "axios";
import io from "socket.io-client";

const socket = io("ws://localhost:9093");

const MSG_LIST = "MSG_LIST";
const MSG_READ = "MSG_READ";
const MSG_RECV = "MSG_RECV";

const initialState = {
  msgList: [],
  unread: 0,
  users: {}
};

export function chat(state = initialState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {
        ...state,
        msgList: action.payload.msgList,
        users: action.payload.users,
        unread: action.payload.msgList.filter(
          v => !v.read && action.payload.userid === v.to
        ).length
      };
    case MSG_RECV:
      const num = action.payload.userid === action.payload.data.to ? 1 : 0;
      return {
        ...state,
        msgList: [...state.msgList, action.payload.data],
        unread: state.unread + num
      };
    case MSG_READ:
    default:
      return state;
  }
}

export function msgList(data) {
  return { type: MSG_LIST, payload: data };
}
export function msgRecv(data) {
  return { type: MSG_RECV, payload: data };
}
export function getMsgList() {
  return (dispatch, getState) => {
    axios.get("/user/msgList").then(res => {
      if (res.status === 200 && res.data.code === 0) {
        const userid = getState().user._id;
        dispatch(msgList({ ...res.data.data, userid }));
      }
    });
  };
}
export function getMsgRecv() {
  return (dispatch, getState) => {
    socket.on("recvMsg", function(data) {
      const userid = getState().user._id;
      dispatch(msgRecv({ data, userid }));
    });
  };
}

export function sendMsg({ from, to, msg }) {
  return dispatch => {
    socket.emit("sendMsg", { from, to, msg });
  };
}
