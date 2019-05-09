import React from "react";
import { connect } from "react-redux";
import { getUserList } from "../../redux/chatUser.redux";
import UserCard from "../userCard/UserCard";

@connect(
  state => state.chatUser,
  { getUserList }
)

class Genius extends React.Component {
  componentDidMount() {
    this.props.getUserList({ type: "boss" });
  }
  render() {
    const { userList } = this.props;
    return (
      <div>
        <UserCard list={userList} />
      </div>
    );
  }
}
export default Genius;
