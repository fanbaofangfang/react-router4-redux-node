import React from "react";
import { Redirect } from "react-router-dom";
import Logo from "../../component/logo/Logo";
import { List, InputItem, WhiteSpace, Button, Radio } from "antd-mobile";
import { connect } from "react-redux";
import { register } from "../../redux/user.redux";

const RadioItem = Radio.RadioItem;

@connect(
  state => state.user,
  { register }
)
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "genius",
      user: "",
      pwd: "",
      repeatPwd: ""
    };
  }
  componentDidMount() {}
  handleChange(key, value) {
    this.setState({
      [key]: value
    });
  }
  handleRegister = () => {
    const { type, pwd, user, repeatPwd } = this.state;
    this.props.register({ type, pwd, user, repeatPwd });
  };
  render() {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <List>
          <InputItem
            placeholder="请输入"
            onChange={v => this.handleChange("user", v)}
          >
            用户名
          </InputItem>
          <WhiteSpace />
          <InputItem
            type="password"
            placeholder="请输入"
            onChange={v => this.handleChange("pwd", v)}
          >
            密码
          </InputItem>
          <WhiteSpace />
          <InputItem
            type="password"
            placeholder="请输入"
            onChange={v => this.handleChange("repeatPwd", v)}
          >
            确认密码
          </InputItem>
          <WhiteSpace />
          <RadioItem
            key="genius"
            checked={this.state.type === "genius"}
            onClick={() => this.handleChange("type", "genius")}
          >
            牛人
          </RadioItem>
          <RadioItem
            key="boss"
            checked={this.state.type === "boss"}
            onClick={() => this.handleChange("type", "boss")}
          >
            {" "}
            BOSS
          </RadioItem>
          <Button type="primary" onClick={this.handleRegister}>
            注册
          </Button>
          <WhiteSpace />
          <Button
            type="primary"
            onClick={() => {
              this.props.history.push("/login");
            }}
          >
            登录
          </Button>
        </List>
      </div>
    );
  }
}
export default Register;
