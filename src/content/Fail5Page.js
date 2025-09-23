import React, { Component } from "react";
import { setStoreData } from "../actions/appActions";

class Fail5Page extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    if (this.store) {
      this.state = {
        ...this.store.getState(),
      };
    } else this.state = {};

    this.closeButton_clickHandler = this.closeButton_clickHandler.bind(this);
  }

  closeButton_clickHandler(event) {
    this.state.closeHandler();
  }

  render() {
    let children = [];
    children.push(this.props.children);

    return (
      <div className="g5 failPage">
        <div className="pageBg"></div>

        <div className="bg"></div>
        <div className="pageBg disappear-opacity"></div>
        <div className="fade-left"></div>
        <div className="fade-right"></div>
        <div className="head appear-zoom">
          <h1>Ой, не получилось</h1>
        </div>
        <div className="plate appear-top delay500ms">
          <div className="logo floating"></div>
          <h2>Не расстраивайся! Регистрируй чеки и играй ещё.</h2>
        </div>
        <div
          className="primary-button button appear-bottom delay1s"
          onClick={this.closeButton_clickHandler}
        >
          Закрыть
        </div>
      </div>
    );
  }
}

export default Fail5Page;
