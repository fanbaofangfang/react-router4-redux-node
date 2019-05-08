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
class GeniusInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
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
        <NavBar mode="dark">牛人信息</NavBar>
        <AvatorSelector avatorSelect={this.avatorSelect} />
        <InputItem
          placeholder="请输入"
          onChange={v => this.handleChange("title", v)}
        >
          应聘岗位
        </InputItem>
        <TextareaItem
          title="个人描述"
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
export default GeniusInfo;
