import React, { Component } from "react";

import mainReducer from "./reducers/mainReducer";
import Container from "./core/Container";

import DataManager from "./core/DataManager";
import Control from "./core/Control";

import { Provider } from "react-redux";
import { createStore } from "redux";

import { appInit, setStoreData } from "./actions/appActions";

import settings from "./configuration/Settings";

import "./css/app.css";
import "./css/buttons.css";
import "./css/typographics.css";
import "./css/animations.css";
import "./css/components.css";
import "./css/content.css";
import "./css/game.css";
import "./css/animation.scss";
import "./css/circularProgress.scss";

import Game2Settings from "./configuration/Game2Settings";
import Game1Settings from "./configuration/Game1Settings";
import Game3Settings from "./configuration/Game3Settings";
import Game4Settings from "./configuration/Game4Settings";
import Game5Settings from "./configuration/Game5Settings";

const Store = createStore(
  mainReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  resize(width, height) {
    this.setState({
      ...this.state,
      windowWidth: width,
      windowHeight: height,
    });
  }

  setData(data) {
    Store.dispatch(setStoreData(data));
  }

  getData(data) {
    return Store.getState();
  }

  showError() {
    Store.dispatch(setStoreData({ error: true }));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  componentDidMount() {
    Store.dispatch(
      appInit({
        ...settings,
        game1: Game1Settings,
        game2: Game2Settings,
        game3: Game3Settings,
        game4: Game4Settings,
        game5: Game5Settings,
      })
    );

    this.props.onInit(this);
  }

  render() {
    return (
      <Provider store={Store}>
        <Container
          id="Container"
          windowWidth={this.state.windowWidth}
          windowHeight={this.state.windowHeight}
          store={Store}
        >
          <DataManager store={Store} />
          <Control app={this} store={Store} />
        </Container>
      </Provider>
    );
  }
}

export default App;
