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
      <div className="finishPage common">
        <div className="pageBg"></div>
        <div className="head appear-opacity">
          <h1>Время закончилось!</h1>
        </div>
        <div className="score-box">
          <div className="score-plate appear-top">
            <h2>
              Супер!
              <br />
              Ты успел набрать:
            </h2>
            <div className="score-pie appear-zoom delay500ms">
              <div className="score-value">{this.state.gameScore} </div>
              <div className="score-title">
                {getScoreTitleInGenitive(this.state.gameScore)}
              </div>
            </div>
          </div>
        </div>
        <div className="button-group appear-bottom">
          {!this.state.userNotAuthorized && (
            <div
              className="secondary-button button appear-bottom"
              onClick={this.scoresButton_clickHandler}
            >
              Смотреть рейтинг
            </div>
          )}
          <div
            className="primary-button button"
            onClick={this.startButton_clickHandler}
          >
            Играть заново
          </div>
        </div>

        {/* {this.state.userNotAuthorized && (
          <>
            <div className="signUpInfo appear-opacity">
              Регистрируйся в Акции, попадай в ТОП-500 игроков и участвуй в
              розыгрыше призов:
            </div>
            <div
              className="secondary-button button appear-bottom"
              onClick={this.signUpWarning_clickHandler}
            >
              Регистрация
            </div>
          </>
        )} */}
      </div>
    );
  }
}

export default Finish1Page;
