import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { NavBar, InputItem, TextareaItem, Button } from "antd-mobile";
import AvatorSelector from "../../component/avator-selector/avator-selector";
import { update } from "../../redux/user.redux";
@connect(
  state => state.user,
  { update }
)
class BossInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      company: "",
      money: "",
      desc: "",
      avatar: ""
    };
  }
  handleChange(key, value) {
    this.setState({
      [key]: value
    });
  }
  avatorSelect = value => {
    this.setState({
      avatar: value
    });
  };
  update = () => {
    this.props.update(this.state);
  };
  render() {
    return (
      <div>
        {this.props.redirectTo &&
        this.props.location.pathname !== this.props.redirectTo ? (
          <Redirect to={this.props.redirectTo} />
        ) : null}
        <NavBar mode="dark">BOSS信息</NavBar>
        <AvatorSelector avatorSelect={this.avatorSelect} />
        <InputItem
          placeholder="请输入"
          onChange={v => this.handleChange("position", v)}
        >
          招聘岗位
        </InputItem>
        <InputItem
          placeholder="请输入"
          onChange={v => this.handleChange("company", v)}
        >
          公司名称
        </InputItem>
        <InputItem
          placeholder="请输入"
          onChange={v => this.handleChange("money", v)}
        >
          薪资范围
        </InputItem>
        <TextareaItem
          title="公司描述"
          placeholder="请输入"
          onChange={v => this.handleChange("desc", v)}
          row={3}
          autoHeight
        />
        <Button type="primary" onClick={this.update}>
          保存
        </Button>
      </div>
    );
  }
}
export default BossInfo;
