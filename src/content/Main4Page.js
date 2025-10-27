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

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      this.onStoreChange();
    });
    this.mounted = true;
    if (!this.started) {
      this.registerStart();
      this.started = true;
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.mounted = false;
  }

  onStoreChange() {
    if (this.mounted) {
      let state = this.store.getState();
      this.setState({
        ...this.state,
        ...state,
      });
    }
  }

  registerStart() {
    if (this.state.userNotAuthorized) return;
    this.store.dispatch(
      setStoreData({
        requestCheck: {
          request: this.state.gameData.request1,
          data: { play: false },
        },
      })
    );
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
      <div className="mainPage g4">
        <div className="pageBg"></div>
        <div>
          <div className="pageBg-head-snowflake floating-large"></div>
          <div className="pageBg-head-snowflake floating-large"></div>
          <div className="pageBg-head-snowflake floating-large"></div>
        </div>
        <div className="pageBg-head slow-pulsing"></div>
        <div className="head appear-zoom">
          <div className="logo-bg logo-bg-pulsing"></div>
          <div className="logo-snow-left"></div>
          <div className="logo-snow-right"></div>
          <div className="logo floating"></div>
          <h1 className="caps">Тайный Лосянта</h1>
        </div>
        <div className="plate appear-top delay500ms">
          <p>Угадай Тайного лосянту!</p>
          <p className="orange">
            Определи какому Лосянте больше соответствует вопрос и
            выиграй&nbsp;подарок!
            <br />
            <br />
            <b>Участие в игре - 1 балл.</b>
          </p>
        </div>
        {this.state.gameCredentials?.attemptsLeft > 0 && (
          <div
            className="primary-button button-large appear-bottom delay1s"
            onClick={this.startButton_clickHandler}
          >
            Играть
          </div>
        )}

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

export default Main4Page;
