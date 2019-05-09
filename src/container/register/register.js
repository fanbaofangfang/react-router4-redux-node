import React from "react";
import { Redirect } from "react-router-dom";
import Logo from "../../component/logo/Logo";
import { List, InputItem, WhiteSpace, Button, Radio } from "antd-mobile";
import { connect } from "react-redux";
import { register } from "../../redux/user.redux";
import ImoocForm from "../../component/imooc-form/imoocForm";
const RadioItem = Radio.RadioItem;

@connect(
  state => state.user,
  { register }
)
@ImoocForm
class Register extends React.Component {
  componentDidMount() {
    this.props.handleChange("type", "genius");
  }
  handleRegister = () => {
    const { type, pwd, user, repeatPwd } = this.props.state;
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
          <WhiteSpace />
          <InputItem
            type="password"
            placeholder="请输入"
            onChange={v => this.props.handleChange("repeatPwd", v)}
          >
            确认密码
          </InputItem>
          <WhiteSpace />
          <RadioItem
            key="genius"
            checked={this.props.state.type === "genius"}
            onClick={() => this.props.handleChange("type", "genius")}
          >
            牛人
          </RadioItem>
          <RadioItem
            key="boss"
            checked={this.props.state.type === "boss"}
            onClick={() => this.props.handleChange("type", "boss")}
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
