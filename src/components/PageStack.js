import React, { Component } from "react";
import MainPage from "../content/MainPage";
import FinishPage from "../content/FinishPage";
import ScoresPage from "../content/ScoresPage";
import Game1Page from "../content/Game1Page";
import Game2Page from "../content/Game2Page";
import Game3Page from "../content/Game3Page";
import Game4Page from "../content/Game4Page";
import Game5Page from "../content/Game5Page";
import Main1Page from "../content/Main1Page";
import Finish1Page from "../content/Finish1Page";
import Main2Page from "../content/Main2Page";
import Main3Page from "../content/Main3Page";
import Main4Page from "../content/Main4Page";
import Main5Page from "../content/Main5Page";
import Fail5Page from "../content/Fail5Page";
import Prize5Page from "../content/Prize5Page";

class PageStack extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    if (this.store) {
      this.state = {
        ...this.store.getState(),
      };
    } else this.state = { currentPage: "main" };
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

  render() {
    return (
      <div className="pageContainer">
        {this.state.currentPage === "main" &&
          ((this.state.gameIndex == 1 && (
            <Main1Page bounds={this.props.bounds} store={this.store} />
          )) ||
            (this.state.gameIndex == 2 && (
              <Main2Page bounds={this.props.bounds} store={this.store} />
            )) ||
            (this.state.gameIndex == 3 && (
              <Main3Page bounds={this.props.bounds} store={this.store} />
            )) ||
            (this.state.gameIndex == 4 && (
              <Main4Page bounds={this.props.bounds} store={this.store} />
            )) ||
            (this.state.gameIndex == 5 && (
              <Main5Page bounds={this.props.bounds} store={this.store} />
            )) || <MainPage bounds={this.props.bounds} store={this.store} />)}

        {this.state.currentPage === "game" &&
          ((this.state.gameIndex == 1 && (
            <Game1Page bounds={this.props.bounds} store={this.store} />
          )) ||
            (this.state.gameIndex == 2 && (
              <Game2Page bounds={this.props.bounds} store={this.store} />
            )) ||
            (this.state.gameIndex == 3 && (
              <Game3Page bounds={this.props.bounds} store={this.store} />
            )) ||
            (this.state.gameIndex == 4 && (
              <Game4Page bounds={this.props.bounds} store={this.store} />
            )) ||
            (this.state.gameIndex == 5 && (
              <Game5Page bounds={this.props.bounds} store={this.store} />
            )))}
        {this.state.currentPage === "finish" && (
          <Finish1Page bounds={this.props.bounds} store={this.store} />
        )}

        {this.state.currentPage === "fail" && (
          <Fail5Page bounds={this.props.bounds} store={this.store} />
        )}
        {this.state.currentPage === "prize" && (
          <Prize5Page bounds={this.props.bounds} store={this.store} />
        )}

        {this.state.currentPage === "scores" && (
          <ScoresPage bounds={this.props.bounds} store={this.store} />
        )}
      </div>
    );
  }
}

export default PageStack;
