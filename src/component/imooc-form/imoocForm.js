import React from "react";

export default function ImoocForm(Comp) {
  return class WrapperComp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    componnetDidMount() {}
    handleChange = (key, value) => {
      this.setState({
        [key]: value
      });
    };
    render() {
      return (
        <Comp
          handleChange={this.handleChange}
          state={this.state}
          {...this.props}
        />
      );
    }
  };
}
