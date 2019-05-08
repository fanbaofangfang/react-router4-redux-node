import React from "react";
import PropTypes from "prop-types";
import { Card, WingBlank, WhiteSpace } from "antd-mobile";
import { withRouter } from "react-router-dom";
@withRouter
class UserCard extends React.Component {
  static propTypes = {
    list: PropTypes.array.isRequired
  };
  handleClick(v) {}
  render() {
    const { list } = this.props;
    return (
      <div>
        <WingBlank>
          <WhiteSpace size="lg" />
          {list.map(v =>
            v.avatar ? (
              <Card key={v._id}>
                <WhiteSpace size="lg" />
                <Card.Header
                  title={v.title}
                  thumb={require(`../img/${v.avatar}.png`)}
                  extra={<span>{v.type === "boss" ? v.company : ""}</span>}
                />
                <Card.Body>
                  <div>工作要求：{v.desc}</div>
                  {v.type === "boss" ? <div>薪资范围：{v.money}</div> : null}
                </Card.Body>
              </Card>
            ) : null
          )}
          <WhiteSpace />
        </WingBlank>
      </div>
    );
  }
}
export default UserCard;
