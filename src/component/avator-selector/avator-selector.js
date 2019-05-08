import React from "react";
import { Grid,List } from "antd-mobile";
export default class AvatorSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgObj: {}
    };
  }
  handleClick = imgObj => {
    console.log(imgObj);
    this.setState({ imgObj });
    this.props.avatorSelect(imgObj.text);
  };
  render() {
    const avatorList = "boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra"
      .split(",")
      .map(_val => ({
        icon: require(`../img/${_val}.png`),
        text: _val
      }));
      const listHeader = this.state.imgObj.icon ? <img src={this.state.imgObj.icon} />:"请选择头像"
    return (
      <div>
        <List renderHeader={listHeader}>
          <Grid data={avatorList} columnNum={5} onClick={this.handleClick} />
        </List>
      </div>
    );
  }
}
