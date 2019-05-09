import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Result, WhiteSpace, Button, List, Modal } from "antd-mobile";
import { logoutSubmit } from "../../redux/user.redux";
import browserCookie from "browser-cookies";
const { alert } = Modal;
@connect(
  state => state.user,
  { logoutSubmit }
)
 class UserInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  logout() {
    alert("退出", "确认退出?", [
      { text: "取消", onPress: () => console.log("cancel") },
      {
        text: "确认",
        onPress: () => {
          browserCookie.erase("userid");
          this.props.logoutSubmit();
        }
      }
    ]);
  }
  render() {
    const { avatar, desc, company, title, type, money, user } = this.props;
    const myImg = src => (
      <img src={src} className="spe am-icon am-icon-md" alt="" />
    );
    const Item = List.Item;
    const Brief = Item.Brief;
    return user ? (
      <div>
        <Result
          img={myImg(require(`../img/${avatar}.png`))}
          title={user}
          message={type === "boss" ? <div>{company}</div> : null}
        />
        <WhiteSpace />
        <List renderHeader={() => "简介"}>
          <Item multipleLine>
            {title}
            {desc.split("\n").map(v => (
              <Brief key={v}>{v}</Brief>
            ))}
            {money ? <Brief>薪资:{money}</Brief> : null}
          </Item>
          <Button onClick={() => this.logout()}>退出登录</Button>
        </List>
        <WhiteSpace />
      </div>
    ) : <Redirect to={this.props.redirectTo} />;
  }
}
export default UserInfo;