import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../../component/logo/Logo";
import { List, InputItem, WhiteSpace, Button } from "antd-mobile";
import { login } from "../../redux/user.redux";

@connect(
  state => state.user,
  { login }
)
class Login extends React.Component {
  state = {
    user: "",
    pwd: ""
  };
  handleChange(key, value) {
    this.setState({
      [key]: value
    });
  }
  handleLogin = () => {
    const { user, pwd } = this.state;
    this.props.login({ user, pwd });
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
          <Button type="primary" onClick={this.handleLogin}>
            登录
          </Button>
          <WhiteSpace />
          <Button
            type="primary"
            onClick={() => {
              this.props.history.push("/register");
            }}
          >
            注册
          </Button>
        </List>
      </div>
    );
  }
}
export default Login;
