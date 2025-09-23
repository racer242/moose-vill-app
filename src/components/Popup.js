import React, { Component } from "react";
import { ReactComponent as X } from "../images/x.svg";

class Popup extends Component {
  constructor(props) {
    super(props);
    this.closeButton_clickHandler = this.closeButton_clickHandler.bind(this);

    this.state = {};
  }

  closeButton_clickHandler(event) {
    if (this.props.onClose) this.props.onClose();
  }

  render() {
    let children = [];
    children.push(this.props.children);

    return (
      <div id="Popup" key="Popup" onClick={this.closeButton_clickHandler}>
        <div
          id="PopupContainer"
          key="PopupContainer"
          {...this.props}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div id="PopupContent" key="PopupContent">
            {children}
          </div>
          <X
            width={60}
            className="close-button popup-close"
            onClick={this.closeButton_clickHandler}
          />
        </div>
      </div>
    );
  }
}

export default Popup;
