import React, { Component } from "react";
import { setStoreData } from "../actions/appActions";

class Main2Page extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    if (this.store) {
      this.state = {
        ...this.store.getState(),
      };
    } else this.state = {};

    this.startButton_clickHandler = this.startButton_clickHandler.bind(this);
    this.signUpWarning_clickHandler =
      this.signUpWarning_clickHandler.bind(this);
  }

  startButton_clickHandler(event) {
    this.store.dispatch(
      setStoreData({
        currentPage: "game",
      })
    );
  }

  signUpWarning_clickHandler(event) {
    if (this.state.signUpHandler) {
      this.state.signUpHandler();
    }
  }

  render() {
    let children = [];
    children.push(this.props.children);

    return (
      <div className="mainPage g2">
        <div className="pageBg slow-pulsing"></div>
        <div className="head appear-zoom">
          <div className="logo-bg logo-bg-pulsing"></div>
          <div className="logo-snow-left"></div>
          <div className="logo-snow-right"></div>
          <div className="logo floating"></div>
          <h1 className="caps">Снежки</h1>
        </div>
        <div className="plate appear-top delay500ms">
          <p>
            Играй в&nbsp;снежки с&nbsp;жителями Лосьвилля! Внимательно наблюдай
            за&nbsp;поляной, ведь лосики очень любят играть и прятаться, они
            всегда появляются неожиданно!
          </p>
          <p className="orange">
            Лосики будут появляться на&nbsp;экране, а&nbsp;ты&nbsp;–&nbsp;успей
            попасть в&nbsp;них снежком. Игра длится 60&nbsp;секунд,
            за&nbsp;каждое удачное попадание начисляется +1&nbsp;балл
          </p>
        </div>
        <div
          className="primary-button button-large appear-bottom delay1s"
          onClick={this.startButton_clickHandler}
        >
          Играть
        </div>

        {this.state.userNotAuthorized && !this.state.activityIsOver && (
          <div
            className="signUpWarning appear-zoom"
            onClick={this.signUpWarning_clickHandler}
          >
            <span className="signUpLink">Зарегистрируйся</span> в Акции, чтобы
            сохранить результат игры
          </div>
        )}
      </div>
    );
  }
}

export default Main2Page;
