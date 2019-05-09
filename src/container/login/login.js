import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../../component/logo/Logo";
import { List, InputItem, WhiteSpace, Button } from "antd-mobile";
import { login } from "../../redux/user.redux";
import ImoocForm from "../../component/imooc-form/imoocForm"
@connect(
  state => state.user,
  { login }
)
@ImoocForm
class Login extends React.Component {
  state = {
    user: "",
    pwd: ""
  };
  handleLogin = () => {
    const { user, pwd } = this.props.state;
    this.props.login({ user, pwd });
  };
  render() {
    const { redirectTo } = this.props;
    return (
      <div>
        {redirectTo && redirectTo !== "/login" ? (
          <Redirect to={redirectTo} />
        ) : null}
        <Logo />
        <List>
          <InputItem
            placeholder="请输入"
            onChange={v => this.props.handleChange("user", v)}
          >
            用户名
          </InputItem>
          <WhiteSpace />
          <InputItem
            type="password"
            placeholder="请输入"
            onChange={v => this.props.handleChange("pwd", v)}
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
