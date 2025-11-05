import React, { Component } from "react";
import { setStoreData } from "../actions/appActions";
import { ReactComponent as CheckboxOff } from "../images/checkbox-off.svg";
import { ReactComponent as CheckboxOn } from "../images/checkbox-on.svg";

class Main4Page extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    if (this.store) {
      this.state = {
        ...this.store.getState(),
      };
    } else this.state = {};

    this.state.warningChecked = false;

    this.startButton_clickHandler = this.startButton_clickHandler.bind(this);
    this.signUpWarning_clickHandler =
      this.signUpWarning_clickHandler.bind(this);
    this.warningCheckButton_clickHandler =
      this.warningCheckButton_clickHandler.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      this.onStoreChange();
    });
    this.mounted = true;
    if (!this.started) {
      this.registerCheck();
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

  registerCheck() {
    if (this.state.userNotAuthorized) return;
    this.store.dispatch(
      setStoreData({
        requestCheck: {
          request: this.state.gameData.request0,
          data: { play: false },
        },
      })
    );
  }

  startButton_clickHandler(event) {
    if (!this.state.warningChecked) {
      this.state.playWithoutConfirmation();
    } else {
      this.store.dispatch(
        setStoreData({
          currentPage: "game",
        })
      );
    }
  }

  signUpWarning_clickHandler(event) {
    if (this.state.signUpHandler) {
      this.state.signUpHandler();
    }
  }

  warningCheckButton_clickHandler(event) {
    this.setState({
      ...this.setState,
      warningChecked: !this.state.warningChecked,
    });
  }

  render() {
    let children = [];
    children.push(this.props.children);

    return (
      <div className="mainPage g4">
        <div className="pageBg"></div>
        <div className="pageBg-head-snowflake-container">
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
          <p>Угадай, кто твой Тайный Лосянта!</p>
          <p className="orange">
            Один из&nbsp;жителей Лосьвилля приготовил для&nbsp;тебя подарок!
            Определи, какому из&nbsp;трех лосиков больше всего соответствует
            заданный вопрос, и выиграй приз!
            <br />
            <br />
            <b>Участие в&nbsp;игре&nbsp;–&nbsp;1&nbsp;балл.</b>
          </p>
        </div>

        <div
          className="g-checkbox appear-bottom delay500ms"
          onClick={this.warningCheckButton_clickHandler}
          style={{
            visibility:
              this.state.gameCredentials?.attemptsLeft > 0 &&
              !this.state.activityIsOver
                ? "visible"
                : "hidden",
          }}
        >
          {this.state.warningChecked ? <CheckboxOn /> : <CheckboxOff />}
          <p>
            Подтверждаю списание <b>1 балла</b>
          </p>
        </div>

        <div
          className={
            "primary-button button-large show-bottom delay1s" +
            (this.state.warningChecked ? "" : " disabled")
          }
          onClick={this.startButton_clickHandler}
          style={{
            visibility:
              this.state.gameCredentials?.attemptsLeft > 0 &&
              !this.state.activityIsOver
                ? "visible"
                : "hidden",
          }}
        >
          Играть
        </div>

        {this.state.userNotAuthorized && !this.state.activityIsOver && (
          <div
            className="signUpWarning appear-zoom"
            onClick={this.signUpWarning_clickHandler}
          >
            <span className="signUpLink">Зарегистрируйся</span> в Акции, чтобы
            сыграть в игру!
          </div>
        )}

        {this.state.activityIsOver && (
          <div className="signUpWarning appear-zoom">Акция закончилась...</div>
        )}
      </div>
    );
  }
}

export default Main4Page;
