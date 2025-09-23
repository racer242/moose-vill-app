import React, { Component } from "react";
import { setStoreData } from "../actions/appActions";
import md5 from "md5";

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    if (this.store) {
      this.state = {
        ...this.store.getState(),
      };
    } else this.state = {};

    this.ref = React.createRef();

    this.state = {
      ...this.state,
      countdown: 0,
      score: 0,
      finished: false,
    };

    this.closeButton_clickHandler = this.closeButton_clickHandler.bind(this);
    this.initCount = 0;
    this.counter = 0;
    if (this.countdownTimer != null) clearTimeout(this.countdownTimer);
    if (this.gameTimer != null) clearTimeout(this.gameTimer);
    if (this.stopTimer != null) clearTimeout(this.stopTimer);
    this.countdown = 0;
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      this.onStoreChange();
    });
    this.mounted = true;
    this.startGame();
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
    if (this.state.userNotAuthorized) return;
    this.store.dispatch(
      setStoreData({
        requestStart: {
          request: this.state.gameData.request1,
          data: { mode: "start", tentCode: this.state.gameData.id },
        },
      })
    );
  }

  registerFinish() {
    if (this.state.userNotAuthorized) return;
    let guid = this.state.gameCredentials?.guid;
    let userCode = this.state.gameCredentials?.userCode;
    let marks = this.state.score;
    let hash = md5(userCode + guid + guid + guid + marks);
    this.store.dispatch(
      setStoreData({
        requestFinish: {
          request: this.state.gameData.request2,
          data: {
            mode: "finish",
            hash,
            guid,
            marks,
          },
        },
      })
    );
  }

  setState(data) {
    data.countdown = this.countdown;
    super.setState(data);
  }

  startGame() {
    if (!this.started) {
      this.registerStart();

      this.started = true;
      this.countdown = 0;
      this.setState({
        ...this.state,
        finished: false,
      });
      this.stepGame();
      this.controlGame();
      this.doStart();
    }
  }

  controlGame() {
    if (this.doControl()) {
      if (this.countdownTimer != null) clearTimeout(this.countdownTimer);
      this.countdownTimer = setTimeout(this.controlGame.bind(this), 1000);
    }
  }

  stepGame() {
    if (this.doGame()) {
      if (this.gameTimer != null) clearTimeout(this.gameTimer);
      if (this.initCount > 1) {
        this.gameTimer = setTimeout(
          this.stepGame.bind(this),
          this.state.stepDuration
        );
      } else {
        this.initCount++;
        this.gameTimer = setTimeout(
          this.stepGame.bind(this),
          this.state.stepDuration / 100
        );
      }
    }
  }

  stopGame() {
    if (this.gameTimer != null) clearTimeout(this.gameTimer);
    this.gameTimer = null;
    if (this.countdownTimer != null) clearTimeout(this.countdownTimer);
    this.countdownTimer = null;
    this.started = false;
    this.setState({
      ...this.state,
      finished: true,
    });
  }

  finishGame() {
    if (this.stopTimer != null) clearTimeout(this.stopTimer);
    this.stopTimer = setTimeout(() => {
      this.registerFinish();
      if (this.stopTimer != null) clearTimeout(this.stopTimer);
      this.stopTimer = setTimeout(() => {
        this.store.dispatch(
          setStoreData({
            currentPage: "finish",
            gameScore: this.state.score,
          })
        );
      }, this.state.stopDuration / 2);
    }, this.state.stopDuration / 2);
  }

  doControl() {
    if (this.countdown == this.state.gameDuration) {
      this.stopGame();
      this.finishGame();
      return false;
    }

    this.setState({
      ...this.state,
      countdown: this.countdown,
    });
    this.countdown++;
    return true;
  }

  doStart() {}
  doGame() {
    return true;
  }

  closeButton_clickHandler(event) {
    this.stopGame();
    this.store.dispatch(setStoreData({ currentPage: "main" }));
  }

  render() {
    let children = [];
    children.push(this.props.children);

    return (
      <div className="gamePage" ref={this.ref}>
        {children}
      </div>
    );
  }
}

export default GamePage;
