import React, { Component } from "react";
import { setStoreData } from "../actions/appActions";
import { getAttemptsTitleInGenitive } from "../utils/stringTools";

class Main5Page extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    if (this.store) {
      this.state = {
        ...this.store.getState(),
      };
    } else this.state = {};

    this.startButton_clickHandler = this.startButton_clickHandler.bind(this);
    this.registerButton_clickHandler =
      this.registerButton_clickHandler.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      this.onStoreChange();
    });
    this.mounted = true;
    this.registerStart();
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.mounted = false;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

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
    this.store.dispatch(
      setStoreData({
        requestStart: {
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

  registerButton_clickHandler(event) {
    this.state.registerHandler();
  }

  render() {
    let children = [];
    children.push(this.props.children);
    let attemptsLeft = this.state.gameCredentials?.attemptsLeft ?? 0;

    return (
      <div className="g5 mainPage">
        <div className="pageBg"></div>

        <div className="bg"></div>
        <div className="fade-left"></div>
        <div className="fade-right"></div>
        <div className="head appear-zoom">
          <div className="logo floating"></div>
          <h1>Будь готов к&nbsp;Добрый Fest на&nbsp;все&nbsp;360°!</h1>
        </div>
        {!this.state.showError && (
          <>
            <div className="plate appear-top delay500ms">
              <p>
                Найди объект с логотипом «Пятёрочка». Крути изображение, ищи и
                нажимай.
              </p>
              {this.state.gameCredentials && attemptsLeft > 0 && (
                <p className="green-plate">
                  У тебя {attemptsLeft}{" "}
                  {getAttemptsTitleInGenitive(attemptsLeft)}
                </p>
              )}
              {this.state.gameCredentials && attemptsLeft <= 0 && (
                <p className="yellow-plate">
                  Чтобы играть, зарегистрируй чек с акционной продукцией из
                  Пятёрочки
                </p>
              )}
            </div>
            <div className="button-group">
              {this.state.gameCredentials && attemptsLeft > 0 && (
                <div
                  className="primary-button button appear-bottom delay1s"
                  onClick={this.startButton_clickHandler}
                >
                  Искать
                </div>
              )}
              {this.state.gameCredentials && attemptsLeft <= 0 && (
                <div
                  className="primary-button inverted button appear-bottom delay1s"
                  onClick={this.registerButton_clickHandler}
                >
                  Зарегистрировать чек
                </div>
              )}
            </div>
          </>
        )}
        {this.state.showError && (
          <div className="plate appear-top delay500ms">
            <p>{this.state.errorText}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Main5Page;
