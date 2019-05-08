import React from "react";
import { connect } from "react-redux";
import { Button, List, Badge } from "antd-mobile";
// @connect(state => state)
 class Msg extends React.Component {
  getLast(arr) {
    return arr[arr.length - 1];
  }
  render() {
    const Item = List.Item;
    const Brief = Item.Brief;
    const userid = this.props.user._id; //当前用户id
    const userinfo = this.props.chat.users;
    const msgGroup = {};
    this.props.chat.chatmsg.map(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || [];
      msgGroup[v.chatid].push(v);
    });
    const chatList = Object.values(msgGroup);
    chatList.sort((a, b) => {
      const aLast = this.getLast(a).create_time;
      const bLast = this.getLast(b).create_time;
      return bLast - aLast;
    });
    return (
      <div>
        {chatList.map(v => {
          const last = this.getLast(v);
          const targetid = v[0].from === userid ? v[0].to : v[0].from;
          const unread = v.filter(ele => !ele.read && ele.to === userid).length;
          return (
            <List key={v._id}>
              {userinfo[targetid] ? (
                <Item
                  extra={<Badge text={unread} />}
                  thumb={require(`../img/${userinfo[targetid].avator}.png`)}
                  arrow="horizontal"
                  onClick={() => this.props.history.push(`/chat/${targetid}`)}
                >
                  {last.content}
                  <Brief>{userinfo[targetid].name}</Brief>
                </Item>
              ) : null}
            </List>
          );
        })}
      </div>
    );
  }
}
export default Msg;