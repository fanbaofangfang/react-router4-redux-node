import React from "react";
import { TabBar } from "antd-mobile";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const TabBarItem = TabBar.Item;
// @connect(state=> state.chat)
@withRouter
class NarBarLink extends React.Component {
  render() {
    const navList = this.props.data.filter(v => !v.hide);
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        tabBarPosition="bottom"
      >
        {navList.map((v, index) => (
          <TabBarItem
            badge={v.path == "/msg" ? this.props.unread : 0}
            title={v.title}
            key={v.path}
            icon={{ uri: require(`./img/${v.icon}.png`) }}
            selectedIcon={{ uri: require(`./img/${v.icon}-active.png`) }}
            selected={v.path === this.props.location.pathname}
            onPress={() => {
              this.props.history.push(v.path);
            }}
          />
        ))}
      </TabBar>
    );
  }
}
export default NarBarLink;
