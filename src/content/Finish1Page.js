import React, { Component } from "react";
import { setStoreData } from "../actions/appActions";
import { getScoreTitleInGenitive } from "../utils/stringTools";

class Finish1Page extends Component {
  constructor(props) {
    super(props);

    this.store = this.props.store;
    if (this.store) {
      this.state = {
        ...this.store.getState(),
      };
    } else this.state = {};

    this.closeButton_clickHandler = this.closeButton_clickHandler.bind(this);
    this.scoresButton_clickHandler = this.scoresButton_clickHandler.bind(this);
    this.startButton_clickHandler = this.startButton_clickHandler.bind(this);
    this.signUpWarning_clickHandler =
      this.signUpWarning_clickHandler.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      this.onStoreChange();
    });
    this.mounted = true;
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

  scoresButton_clickHandler(event) {
    this.store.dispatch(setStoreData({ currentPage: "scores" }));
  }
  startButton_clickHandler(event) {
    this.store.dispatch(setStoreData({ currentPage: "game" }));
  }
  closeButton_clickHandler(event) {
    this.store.dispatch(setStoreData({ currentPage: "main" }));
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
      <div className={"finishPage common g" + this.state.gameIndex}>
        <div className="pageBg slow-pulsing"></div>
        <div className="head appear-opacity">
          <h1 className="caps">Время закончилось!</h1>
        </div>
        <div className="score-box">
          <div className="score-plate appear-top">
            <h2>
              Супер!
              <br />
              <span className="yellow">Ты успел набрать:</span>
            </h2>
            <div className="score-pie appear-zoom delay500ms">
              <div className="score-value">{this.state.gameScore} </div>
              <div className="score-title">
                {getScoreTitleInGenitive(this.state.gameScore)}
              </div>
            </div>
          </div>
        </div>
        {this.state.userNotAuthorized && !this.state.activityIsOver && (
          <>
            <div className="signUpInfo appear-opacity">
              Регистрируйся в Акции, попадай в ТОП-500 игроков и участвуй в
              розыгрыше призов:
            </div>
          </>
        )}
        <div className="button-group">
          <div
            className="secondary-button button button-mobile-adaptive appear-bottom delay300ms"
            onClick={this.startButton_clickHandler}
          >
            Играть ещё...
          </div>
          {(!this.state.userNotAuthorized || this.state.activityIsOver) && (
            <div
              className="primary-button button appear-bottom"
              onClick={this.scoresButton_clickHandler}
            >
              Смотреть рейтинг
            </div>
          )}

          {this.state.userNotAuthorized && !this.state.activityIsOver && (
            <>
              <div
                className="primary-button button appear-bottom"
                onClick={this.signUpWarning_clickHandler}
              >
                Регистрация
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Finish1Page;
