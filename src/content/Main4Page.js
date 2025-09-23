import React, { Component } from "react";
import { setStoreData } from "../actions/appActions";

class Main4Page extends Component {
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
      <div className="g4 mainPage">
        <div className="pageBg"></div>

        <div className="parallax3"></div>
        <div className="parallax2"></div>
        <div className="parallax1"></div>

        <div className="head appear-zoom">
          <div className="logo floating"></div>
          <h1>Вперед к сцене</h1>
        </div>
        <div className="plate appear-top delay500ms">
          <h3>Доберись до Главной сцены Добрый Fest!</h3>
          <p className="orange">
            Тапай на экран, чтобы регулировать высоту и обходить препятствия,
            и получай +3 очка за пойманные банки Добрый®! Чтобы очки зачлись в
            рейтинг, набери минимум 10. Время игры - 60 секунд.
          </p>
        </div>
        <div
          className="primary-button button appear-bottom delay1s"
          onClick={this.startButton_clickHandler}
        >
          Играть
        </div>

        {this.state.userNotAuthorized && (
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

export default Main4Page;
