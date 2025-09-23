import React, { Component } from "react";
import Preload from "react-preload";
import { preloadComplete } from "../actions/appActions";
import resources from "../configuration/Resources";

class Preloader extends Component {
  constructor(props) {
    super(props);
    this.preloader_completeHandler = this.preloader_completeHandler.bind(this);
    this.preloader_errorHandler = this.preloader_errorHandler.bind(this);

    this.store = this.props.store;
    if (this.store) {
      this.state = {
        ...this.store.getState(),
      };
    } else this.state = { gameIndex: 1 };

    this.images = window.gameIndex ? resources[this.state.gameIndex] : [];
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

  preloader_completeHandler(event) {
    console.log("Preload complete");
    // return;
    setTimeout(() => {
      setTimeout(() => {
        this.store.dispatch(preloadComplete());
      }, 500);
      this.setState({
        ...this.state,
        isComplete: true,
      });
    }, 500);
  }

  preloader_errorHandler(event) {
    console.log("Preload error");
    this.preloader_completeHandler();
  }

  render() {
    return (
      <div
        id="Preloader"
        key="Preloader"
        className={"g" + this.state.gameIndex}
        style={{ opacity: this.state.isComplete ? 0 : 1 }}
      >
        <Preload
          children={<div></div>}
          loadingIndicator={<div></div>}
          images={this.images}
          autoResolveDelay={3000}
          onError={this.preloader_errorHandler}
          onSuccess={this.preloader_completeHandler}
          resolveOnError={true}
          mountChildren={true}
        />
        <div className="preload-spin">
          <div
            className={"preloader-display" + " g" + this.state.gameIndex}
          ></div>
        </div>
      </div>
    );
  }
}

export default Preloader;
