import React, { Component } from "react";
import { setStoreData } from "../actions/appActions";

class Main3Page extends Component {
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
      <div className="g3 mainPage">
        <div className="pageBg"></div>
        {!this.props.bounds.mobileSize && (
          <>
            <div className="disc-left music-box"></div>
            <div className="disc-right music-box"></div>
            <div className="music-button-box">
              <div className="music-button button-switching"></div>
              <div className="music-button button-switching delay500ms"></div>
              <div className="music-button button-switching delay1s"></div>
            </div>
            <div className="jack-box">
              <div className="jack button-switching"></div>
              <div className="jack button-switching delay500ms"></div>
              <div className="jack button-switching delay1s"></div>
            </div>
            <div className="ajuster-right ajusting"></div>
            <div className="ajuster-left ajusting delay3s"></div>
          </>
        )}
        {this.props.bounds.mobileSize && (
          <>
            <div className="disc-mobile music-box"></div>
            <div className="handle-box">
              <div className="handle">
                <div className="handle handling"></div>
                <div className="handle-item"></div>
              </div>
              <div className="handle">
                <div className="handle handling delay500ms"></div>
                <div className="handle-item"></div>
              </div>
            </div>
          </>
        )}

        <div className="head appear-zoom">
          <div className="logo floating"></div>
          <h1>Найди мэтч</h1>
        </div>
        <div className="plate appear-top delay500ms">
          <h3>
            Потренируй память и готовься к Главным событиям этого лета вместе
            с Добрый® Кола!
          </h3>
          <p className="orange">
            Переворачивай карточки, как в известной игре. У тебя 60 секунд:
            сколько секунд останется, когда откроешь все пары, столько очков ты
            получишь за игру.
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

export default Main3Page;
