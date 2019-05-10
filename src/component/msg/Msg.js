import React from "react";
import { connect } from "react-redux";
import { Button, List, Badge } from "antd-mobile";
@connect(state => state)
class Msg extends React.Component {
  getLast(arr) {
    return arr[arr.length - 1];
  }
  render() {
    const Item = List.Item;
    const Brief = Item.Brief;
    const userid = this.props.user._id; //当前用户id
    const msgGroup = {};
    this.props.chat.msgList.forEach(ele => {
      msgGroup[ele.chatid] = msgGroup[ele.chatid] || [];
      msgGroup[ele.chatid].push(ele);
    });
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const aTime = this.getLast(a).create_time;
      const bTime = this.getLast(b).create_time;
      return bTime - aTime;
    });
    return (
      //展示所有聊天信息
      //实时显示最后一条聊天信息
      //显示聊天的人的头像和名字
      <div>
        {chatList.map(v => {
          const last = this.getLast(v); //最后一项
          const targetid = v[0].from === userid ? v[0].to : v[0].from;
          const userList = this.props.chat.users;
          const unread = v.filter(ele => !ele.read && ele.to === userid).length;
          return (
            <List key={v[0].chatid}>
              {userList[targetid] ? (
                <Item
                  extra={<Badge text={unread} />}
                  thumb={require(`../img/${userList[targetid].avatar}.png`)}
                  arrow="horizontal"
                  onClick={() => this.props.history.push(`/chat/${targetid}`)}
                >
                  {last.content}
                  <Brief>{userList[targetid].user}</Brief>
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
