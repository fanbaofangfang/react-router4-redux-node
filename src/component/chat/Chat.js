import React from "react";
import { InputItem, List, NavBar, Icon, Grid } from "antd-mobile";
import { connect } from "react-redux";
import { getMsgList, sendMsg, getMsgRecv } from "../../redux/chat.redux";
import { getChatid } from "../../utils";
const Item = List.Item;

@connect(
  state => state,
  { getMsgList, sendMsg, getMsgRecv }
)
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      msg: [],
      showEmoj: false
    };
  }
  componentDidMount() {
    if (!this.props.chat.msgList.length) {
      this.props.getMsgList();
      this.props.getMsgRecv();
    }
  }
  handleSubmit = () => {
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;
    this.props.sendMsg({ from, to, msg });
    this.setState({
      text: ""
    });
  };
  resize = () => {
    // setTimeout(() => {
    //   window.dispatchEvent(new Event("resize"));
    // }, 0);
  };
  render() {
    const emoji = [
      "😍",
      "😃",
      "😀",
      "😃",
      "😄",
      "😁",
      "😆",
      "😅",
      "🤣",
      "😂",
      "🙂",
      "🙃",
      "😉",
      "😊",
      "😇",
      "😍",
      "🤩",
      "😘",
      "😗",
      "😚",
      "😙",
      "😋",
      "😛",
      "😜",
      "🤪",
      "😝",
      "🤑",
      "🤗",
      "🤭",
      "🤫",
      "🤔",
      "🤐",
      "🤨",
      "😐",
      "😑",
      "😶",
      "😏",
      "😒",
      "🙄",
      "😬",
      "🤥",
      "😌",
      "😔",
      "😪",
      "🤤",
      "😴",
      "😷",
      "🤒",
      "🤕",
      "🤢",
      "🤮",
      "🤧",
      "😵",
      "🤯",
      "🤠",
      "😎",
      "🤓",
      "🧐",
      "😕",
      "😟",
      "🙁",
      "😮",
      "😯",
      "😲",
      "😳",
      "😦",
      "😧",
      "😨",
      "😰",
      "😥",
      "😢",
      "😭",
      "👈",
      "👉",
      "👆",
      "🖕",
      "👇",
      "☝",
      "👍",
      "🤜",
      "👏",
      "🙌",
      "👐",
      "🤲",
      "🤝",
      "🙏",
      "✍",
      "💅",
      "🤳",
      "💪",
      "👂",
      "👃",
      "🧠",
      "👀"
    ].map(v => ({ text: v }));
    const userid = this.props.match.params.user;
    const users = this.props.chat.users;
    const msgList = this.props.chat.msgList;
    const chatMsgs = msgList.filter(
      ele => ele.chatid === getChatid(this.props.user._id, userid)
    );
    if (!users[userid]) {
      return null;
    }
    return (
      <div id="chat-page">
        <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 9999 }}>
          <NavBar
            mode="dark"
            icon={<Icon type="left" />}
            onLeftClick={() => this.props.history.goBack()}
          >
            {users[userid].user}
          </NavBar>
        </div>
        <div style={{ paddingBottom: 55, paddingTop: 50 }}>
          {chatMsgs.map(v => {
            return v.from == userid ? (
              <List key={v._id}>
                <Item thumb={require(`../img/${users[v.from].avatar}.png`)}>
                  <div style={{ paddingLef: 5 }}>{v.content}</div>
                </Item>
              </List>
            ) : (
              <List key={v._id}>
                <Item>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ verticalAlign: "-2px", paddingRight: 8 }}>
                      {v.content}
                    </span>
                    <img src={require(`../img/${users[v.from].avatar}.png`)} />
                  </div>
                </Item>
              </List>
            );
          })}
        </div>
        <div
          style={{ position: "fixed", bottom: 0, width: "100%", zIndex: 9999 }}
        >
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={v => this.setState({ text: v })}
              extra={
                <div>
                  {/* <span
                    onClick={() =>
                      this.setState(
                        { showEmoj: !this.state.showEmoj },
                        this.resize()
                      )
                    }
                    style={{ marginRight: 10 }}
                  >
                    🙂
                  </span> */}
                  <span onClick={this.handleSubmit}>发送</span>
                </div>
              }
            >
              信息
            </InputItem>
          </List>
        </div>
      </div>
    );
    //   <div id="chat-page">
    //     <NavBar
    //       mode="dark"
    //       icon={<Icon type="left" />}
    //       onLeftClick={() => this.props.history.goBack()}
    //     >
    //       {users[userid].name}
    //     </NavBar>

    //     {chatmsgs.map(v => {
    //       return v.from == userid ? (
    //         <List key={v._id}>
    //           <Item thumb={require(`../img/${users[v.from].avator}.png`)}>
    //             {v.content}
    //           </Item>
    //         </List>
    //       ) : (
    //         <List key={v._id}>
    //           <Item
    //             extra={
    //               <img src={require(`../img/${users[v.from].avator}.png`)} />
    //             }
    //             className="chat-me"
    //           >
    //             {v.content}
    //           </Item>
    //         </List>
    //       );
    //     })}
    // <div className="socket-footer">
    //   <List>
    //     <InputItem
    //       placeholder="请输入"
    //       value={this.state.text}
    //       onChange={v => this.setState({ text: v })}
    //       extra={
    //         <div>
    //           <span
    //             onClick={() =>
    //               this.setState(
    //                 { showEmoj: !this.state.showEmoj },
    //                 this.resize()
    //               )
    //             }
    //             style={{ marginRight: 10 }}
    //           >
    //             🙂
    //           </span>
    //           <span onClick={this.handleSubmit}>发送</span>
    //         </div>
    //       }
    //     >
    //       信息
    //     </InputItem>
    //   </List>
    //   {this.state.showEmoj ? (
    //     <Grid
    //       data={emoji}
    //       isCarousel
    //       columnNum={9}
    //       carouselMaxRow={3}
    //       onClick={el => {
    //         this.setState({ text: this.state.text + el.text });
    //       }}
    //     />
    //   ) : null}
    // </div>;
    //   </div>
  }
}
export default Chat;
