import React, { Component } from "react";
import { setStoreData } from "../actions/appActions";
import { getScoreTitleInGenitive } from "../utils/stringTools";

class ScoresPage extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;

    this.state = {};

    this.closeButton_clickHandler = this.closeButton_clickHandler.bind(this);
    this.startButton_clickHandler = this.startButton_clickHandler.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      this.onStoreChange();
    });
    this.mounted = true;
    this.store.dispatch(setStoreData({ loadStatusTable: true }));
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

  startButton_clickHandler(event) {
    this.store.dispatch(setStoreData({ currentPage: "game" }));
  }
  closeButton_clickHandler(event) {
    this.state.closeHandler();
  }

  render() {
    let children = [];
    children.push(this.props.children);

    let place = this.state.gameScores?.place;
    let marks = this.state.gameScores?.marks;
    let rating = this.state.gameScores?.rating
      ? this.state.gameScores.rating
      : [];

    let rows = [];
    let after = false;
    for (let i = 0; i < rating.length; i++) {
      let row = rating[i];
      let keep = row.part == "keep" || row.part == "notYet";
      rows.push(
        <ul
          key={"row" + i}
          className={
            "scores-row" + (keep ? " bold" : "") + (after ? " pink" : "")
          }
        >
          <li>{row.period}</li>
          <li>{row.place ?? "—"}</li>
          <li>{row.partTitle ?? "—"}</li>
        </ul>
      );
      if (keep) after = true;
    }

    return (
      <div className={"scoresPage common g" + this.state.gameIndex}>
        <div className="pageBg slow-pulsing"></div>
        <div className="head appear-opacity">
          <h1 className="caps">Участие в розыгрышах</h1>
        </div>
        <div className="scores-layout">
          {!this.state.userNotAuthorized && !this.state.activityIsOver && (
            <div className="scores-info with-plate appear-top">
              <div className="scores-info-plate">
                <h3>У тебя</h3>
                <div className="scores-values">
                  <h2 className="yellow">
                    {marks} {getScoreTitleInGenitive(marks)} и
                  </h2>
                  <h2 className="pink">{place}-е место</h2>
                </div>
                <h3>в рейтинге текущей недели</h3>
              </div>
              <p className="scores-info-comment small">
                Чтобы участвовать в розыгрыше, нужно войти в Топ-500 по очкам на
                неделе, сответствующей розыгрышу.
              </p>
            </div>
          )}
          <div className="scores-info with-table appear-top delay500ms">
            <h3 className="caps">Статусы по неделям</h3>
            <div className="scores-table table">
              <ul className="scores-head white">
                <li>Розыгрыш</li>
                <li>Место</li>
                <li>Участие</li>
              </ul>
              <div className="scores-body black">{rows}</div>
            </div>
          </div>
        </div>
        <div className="button-group appear-bottom">
          <div
            className="secondary-button button"
            onClick={this.closeButton_clickHandler}
          >
            Играть позже
          </div>
          <div
            className="primary-button button"
            onClick={this.startButton_clickHandler}
          >
            Играть заново
          </div>
        </div>
      </div>
    );
  }
}

export default ScoresPage;
