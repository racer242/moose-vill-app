import React, { Component } from "react";

class CircularProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let children = [];
    children.push(this.props.children);

    let value = this.props.value ?? 0;

    return (
      <>
        <svg
          className="circularProgress"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-5 -5 38 38"
        >
          <circle
            cx="14"
            cy="14"
            r="15.9155"
            className="progress-bar__background"
          />

          <circle
            cx="14"
            cy="14"
            r="15.9155"
            className="progress-bar__progress"
            style={{ strokeDashoffset: 100 - value * 100 }}
          />
        </svg>
        <div className="progress-bar__value">{children}</div>
      </>
    );
  }
}

export default CircularProgress;
