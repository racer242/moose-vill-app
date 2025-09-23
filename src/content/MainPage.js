import React, { Component } from "react";
import { setStoreData } from "../actions/appActions";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;

    this.state = {};

    this.startButton_clickHandler = this.startButton_clickHandler.bind(this);
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

  startButton_clickHandler(event) {
    this.store.dispatch(setStoreData({ currentPage: "game" }));
  }

  render() {
    let children = [];
    children.push(this.props.children);

    return (
      <div className="mainPage">
        <h1>
          Собери ключевые атрибуты фестиваля, чтобы максимально кайфануть этим
          летом с Добрый Кола
        </h1>
        <p>
          Нажимай на всё, что создаёт музыкальный вайб и получай очки. И не
          трогай то, что его портит.
        </p>
        <p>Можно ошибиться только три раза</p>
        <div className="primary-button" onClick={this.startButton_clickHandler}>
          Стартуем!
        </div>
      </div>
    );
  }
}

export default MainPage;
