import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getUserInfo } from "../../redux/user.redux";
@connect(
  null,
  { getUserInfo }
)
@withRouter
class AuthRouter extends React.Component {
  componentDidMount() {
    const linkUrl = ["/login", "/register"];
    const { pathname } = this.props.location;
    if (linkUrl.indexOf(pathname) > -1) {
      return null;
    }
    this.props.getUserInfo({
      callback: res => {
        if (res.data.code === 1) {
          this.props.history.push("/login");
        }
      }
    });
  }
  render() {
    return <div />;
  }
}

export default AuthRouter;
