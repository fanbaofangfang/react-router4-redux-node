import React from "react";
import { connect } from "react-redux";
import { NavBar } from "antd-mobile";
import NabLinkBar from "../navBarLink/narBarLink";
import { Switch, Route } from "react-router-dom";
import Boss from "../boss/Boss";
import Genius from "../genius/Genius";
import UserInfo from "../userInfo/UserInfo";
import Msg from "../msg/Msg";
import { getMsgList, getMsgRecv } from "../../redux/chat.redux";

@connect(
  state => state,
  { getMsgList, getMsgRecv }
)
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (!this.props.chat.msgList.length) {
      this.props.getMsgList();
      this.props.getMsgRecv();
    }
  }
  render() {
    const user = this.props.user;
    const navList = [
      {
        path: "/boss",
        text: "牛人",
        icon: "boss",
        title: "牛人列表",
        component: Boss,
        hide: user.type === "genius"
      },
      {
        path: "/genius",
        text: "boss",
        icon: "job",
        title: "BOSS列表",
        component: Genius,
        hide: user.type === "boss"
      },
      {
        path: "/msg",
        text: "消息",
        icon: "msg",
        title: "消息列表",
        component: Msg
      },
      {
        path: "/me",
        text: "我的",
        icon: "user",
        title: "个人中心",
        component: UserInfo
      }
    ];
    const pathname = this.props.location.pathname;
    return (
      <div>
        <NavBar mode="dark">
          {navList.find(v => pathname === v.path)
            ? navList.find(v => pathname === v.path).title
            : ""}
        </NavBar>
        <Switch>
          {navList.map(v => (
            <Route key={v.path} path={v.path} component={v.component} />
          ))}
        </Switch>
        <NabLinkBar data={navList} />
      </div>
    );
  }
}
export default Dashboard;
