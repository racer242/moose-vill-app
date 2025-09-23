import React, { Component } from "react";
import { setStoreData } from "../actions/appActions";

class Prize5Page extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    if (this.store) {
      this.state = {
        ...this.store.getState(),
      };
    } else this.state = {};

    this.state = {
      ...this.state,
      stage: "start",
      selectPrizeStep: 0,
      prizeIndex: 0,
    };

    this.closeButton_clickHandler = this.closeButton_clickHandler.bind(this);
    this.restartButton_clickHandler =
      this.restartButton_clickHandler.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      this.onStoreChange();
    });
    this.mounted = true;
    this.start();
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

  start() {
    if (this.selectTimer != null) clearTimeout(this.selectTimer);
    this.selectTimer = setTimeout(() => {
      this.setState({
        ...this.state,
        stage: "select",
        selectPrizeStep: 0,
        prizeIndex: 0,
      });
      this.selectPrize();
    }, this.state.game5.selectDuration);
  }

  selectPrize() {
    if (this.selectTimer != null) clearTimeout(this.selectTimer);
    this.selectTimer = setTimeout(() => {
      this.changePrize();
    }, this.state.game5.selectDuration);
  }

  changePrize() {
    let prizeName = this.state.gameScores?.prize?.name ?? "noprize";
    let prizeSources = this.state.gameScores?.prizeList;
    let prizeSourceLength = prizeSources?.length ?? 0;
    let stage = this.state.stage;

    let prizeIndex = this.state.prizeIndex + 1;
    let selectPrizeStep = this.state.selectPrizeStep;
    if (prizeIndex >= prizeSourceLength) {
      prizeIndex = 0;
      if (selectPrizeStep < this.state.game5.selectPrizeCount) {
        selectPrizeStep++;
      }
    }
    let currentName = prizeSources[prizeIndex]?.title;
    if (
      selectPrizeStep >= this.state.game5.selectPrizeCount &&
      (currentName === prizeName || prizeName === "noprize")
    ) {
      stage = "show";
    }
    this.setState({
      ...this.state,
      prizeIndex,
      selectPrizeStep,
      stage,
    });

    if (stage === "show") {
      this.showPrize();
    } else {
      this.selectPrize();
    }
  }

  showPrize() {}

  closeButton_clickHandler(event) {
    this.state.closeHandler();
  }

  restartButton_clickHandler(event) {
    this.store.dispatch(
      setStoreData({
        currentPage: "game",
      })
    );
  }

  render() {
    let children = [];
    children.push(this.props.children);

    let attemptsLeft = this.state.gameScores?.attemptsLeft ?? 0;

    let prizeName = this.state.gameScores?.prize?.name ?? "noprize";
    let prizeSources = this.state.gameScores?.prizeList;
    let prizeSourceLength = prizeSources?.length ?? 0;

    let particles = [];
    if (this.state.stage === "show") {
      for (let j = 0; j < this.state.particlesCount * 10; j++) {
        particles.push(<div key={"p" + j} className="particle infinite"></div>);
      }
    }

    let prizes = [];
    for (let i = 0; i < prizeSourceLength; i++) {
      let prizeSrc = prizeSources[i]?.thumb;
      prizes.push(
        <div
          key={"prize" + i}
          className={
            "myprize" + (this.state.stage === "show" ? " floating" : "")
          }
          style={{
            backgroundImage: "url(" + prizeSrc + ")",
            opacity: i === this.state.prizeIndex ? 1 : 0,
          }}
        ></div>
      );
    }

    return (
      <div className="g5 prizePage">
        <div className="pageBg"></div>

        <div className="bg"></div>
        <div className="pageBg disappear-opacity"></div>
        <div className="fade-left"></div>
        <div className="fade-right"></div>
        <div className="prize-page-content appear-opacity">
          {this.state.stage === "select" && (
            <div className="head show-zoom">
              <h1>Определяем твой приз...</h1>
            </div>
          )}
          {this.state.stage === "show" && (
            <div className="head show-zoom">
              <h1>{prizeName === "noprize" ? "Без приза" : "И твой приз"}</h1>
            </div>
          )}

          {(this.state.stage === "select" || this.state.stage === "show") && (
            <div className="prize-container appear-opacity">
              {prizeName === "noprize" && (
                <>
                  {this.state.stage === "show" && (
                    <>
                      <div className="success-container spin duration5s">
                        <div className="success-decor spark"></div>
                        <div className="success-decor spark delay3s"></div>
                      </div>
                      <div className="appear-opacity">
                        <div className="noprize floating"></div>
                      </div>
                    </>
                  )}
                  {this.state.stage !== "show" && <>{prizes}</>}
                </>
              )}

              {prizeName !== "noprize" && (
                <>
                  {this.state.stage === "show" && (
                    <>
                      <div className="prize-particles">{particles}</div>
                      <div className="success-container spin duration5s">
                        <div className="prize-decor fireworks"></div>
                        <div className="prize-decor fireworks delay800ms"></div>
                      </div>
                    </>
                  )}
                  {prizes}
                </>
              )}
            </div>
          )}
          {this.state.stage === "show" && (
            <>
              <div
                className="prize-name show-zoom"
                style={{ opacity: this.state.stage === "show" ? 1 : 0 }}
              >
                <h2>
                  {prizeName === "noprize"
                    ? "Регистрируй чеки и играй ещё"
                    : prizeName}
                </h2>
              </div>
              <div
                className="button-group"
                style={{ opacity: this.state.stage === "show" ? 1 : 0 }}
              >
                <div
                  className="secondary-button small button appear-bottom delay500ms"
                  onClick={this.closeButton_clickHandler}
                >
                  Закрыть
                </div>
                {attemptsLeft > 0 && (
                  <div
                    className="primary-button small button appear-bottom delay1s"
                    onClick={this.restartButton_clickHandler}
                  >
                    Играть еще
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Prize5Page;
