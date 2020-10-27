import React from "react";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <p>Loading failed.</p>;
    }

    return this.props.children;
  }
}
