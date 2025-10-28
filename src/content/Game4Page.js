import React from "react";
import "../css/game4.css";
import "../css/snow.scss";
import "../css/sparking.scss";
import "../css/gifting.scss";

import GamePage from "./GamePage";
import { setStoreData } from "../actions/appActions";
import md5 from "md5";

class Game4Page extends GamePage {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      selected: 0,
      status: "selection",
      prizeIndex: 0,
    };

    this.downX = 0;
    this.moveX = 0;

    this.cardButton_clickHandler = this.cardButton_clickHandler.bind(this);
    this.scene_downHandler = this.scene_downHandler.bind(this);
    this.scene_moveHandler = this.scene_moveHandler.bind(this);
    this.scene_upHandler = this.scene_upHandler.bind(this);
    this.selectButton_clickHandler = this.selectButton_clickHandler.bind(this);
    this.restartButton_clickHandler =
      this.restartButton_clickHandler.bind(this);
  }

  controlGame() {}
  stepGame() {}

  registerStart() {
    if (this.state.userNotAuthorized) return;
    this.store.dispatch(
      setStoreData({
        gameCredentials: null,
        gameScores: null,
        resultReceived: false,
        status: "selection",
        selected: 0,
        requestStart: {
          request: this.state.gameData.request1,
          data: { play: true, mode: "tip" },
          additionalData: { status: "selection", selected: 0 },
        },
      })
    );
  }

  registerFinish() {
    if (this.state.userNotAuthorized) return;
    let guid = this.state.gameCredentials?.guid;
    let userCode = this.state.gameCredentials?.userCode;
    let id = this.state.gameCredentials?.id;
    let answer = this.state.selected + 1;
    let hash = md5(userCode + guid + guid + guid + answer);
    this.store.dispatch(
      setStoreData({
        requestFinish: {
          request: this.state.gameData.request2,
          data: {
            play: true,
            mode: "answer",
            id,
            answer,
            hash,
            guid,
          },
          additionalData: { resultReceived: true },
        },
      })
    );
  }

  getResult() {
    this.getResultTimer = setTimeout(() => {
      this.registerFinish();
      this.showResultTimer = setTimeout(() => {
        if (
          this.state.status === "result" &&
          this.state.gameScores?.prize &&
          this.state.resultReceived
        )
          this.showPrize();
      }, this.state.game4.showResultDelay);
    }, this.state.game4.getResultDelay);
  }

  showPrize() {
    this.store.dispatch(
      setStoreData({
        status: "rotation",
      })
    );
    this.prizeChangeTimer = setTimeout(() => {
      this.setState({ ...this.state, prizeIndex: 0, cycle: 0 });
      this.startPrizeChanging();
    }, 300);
  }

  startPrizeChanging() {
    this.prizeChangeTimer = setTimeout(() => {
      let prizeIndex = this.state.prizeIndex + 1;
      let cycle = this.state.cycle;
      if (prizeIndex >= this.state.gameScores.prizeList.length) {
        prizeIndex = 0;
        cycle++;
        if (cycle > this.state.game4.prizeChangeCount) {
          this.store.dispatch(
            setStoreData({
              status: "prize",
            })
          );
          return;
        }
      }
      this.setState({ ...this.state, prizeIndex, cycle });
      this.startPrizeChanging();
    }, this.state.game4.prizeChangeDuration);
  }

  restart() {
    this.registerStart();
  }

  cardButton_clickHandler(event) {
    this.store.dispatch(
      setStoreData({
        selected: Number(event.target.id),
        status: "result",
      })
    );
    this.getResult();
  }

  selectButton_clickHandler(event) {
    this.store.dispatch(
      setStoreData({
        ...this.state,
        status: "result",
      })
    );
    this.getResult();
  }

  scene_downHandler(event) {
    this.downX = event.clientX;
  }

  scene_moveHandler(event) {
    this.moveX = event.clientX;
  }

  scene_upHandler(event) {
    if (this.state.status === "selection") {
      if (this.downX > this.moveX + this.state.game4.dragThreshold) {
        this.store.dispatch(
          setStoreData({
            ...this.state,
            selected: Math.min(this.state.selected + 1, 2),
          })
        );
      } else if (this.downX < this.moveX - this.state.game4.dragThreshold) {
        this.store.dispatch(
          setStoreData({
            ...this.state,
            selected: Math.max(this.state.selected - 1, 0),
          })
        );
      }
    }
  }

  restartButton_clickHandler(event) {
    this.restart();
  }

  render() {
    let cards = [];
    let gameCredentials = this.state.gameCredentials ?? {};
    for (let i = 0; i < this.state.game4.cardSources.length; i++) {
      let card = this.state.game4.cardSources[i];
      let image =
        this.state.resultReceived && !this.state.gameScores?.prize
          ? null
          : gameCredentials["elk" + (i + 1)];

      let style = {
        ...{
          left: card.x + "px",
        },
        ...(this.props.bounds.mobileSize ? {} : { top: card.y + "px" }),
      };
      style =
        this.state.status !== "selection"
          ? {
              ...style,
              opacity: this.state.selected === i ? 1 : 0,
              left: this.props.bounds.mobileSize
                ? style.left
                : this.state.selected === i
                ? 366
                : style.left,
              pointerEvents: "none",
            }
          : { ...style };

      cards.push(
        <div
          className={
            "g4-card" +
            (this.state.selected === i &&
            (this.props.bounds.mobileSize || this.state.status === "result")
              ? " selected"
              : "")
          }
          id={card.id}
          key={card.id}
          style={style}
          onClick={this.cardButton_clickHandler}
        >
          <div
            className={"g4-card-layer"}
            style={{
              ...(this.state.status === "result" &&
              !this.state.gameScores?.prize &&
              !this.props.bounds.mobileSize
                ? { transform: "scale(1)" }
                : {}),
            }}
          >
            <div
              className={"g4-card-image"}
              style={{
                ...(image
                  ? {
                      backgroundImage: `url(${image})`,
                    }
                  : {}),
                ...(this.props.bounds.mobileSize ||
                this.state.status === "result"
                  ? {}
                  : { transform: `rotate(${card.rotation}deg)` }),
              }}
            ></div>
            <div
              className={"g4-card-frame"}
              style={{
                ...(this.props.bounds.mobileSize ||
                this.state.status === "result"
                  ? {}
                  : { transform: `rotate(${card.rotation}deg)` }),
              }}
            ></div>
          </div>
        </div>
      );
    }

    let sparkParticles = [];
    if (this.state.status === "result") {
      for (let i = 0; i < this.state.game4.sparkParticlesCount; i++) {
        sparkParticles.push(<div key={"p" + i} className="g4-sparking"></div>);
      }
    }

    let giftParticles = [];
    if (this.state.status === "rotation") {
      for (let i = 0; i < this.state.game4.giftParticlesCount; i++) {
        giftParticles.push(<div key={"p" + i} className="g4-gift"></div>);
      }
    }

    let prizelist = [];
    if (this.state.gameScores?.prizeList && this.state.status === "rotation") {
      let l = this.state.gameScores.prizeList.length;
      for (let i = 0; i < l; i++) {
        prizelist.push(
          <div
            key={"prize" + i}
            className="g4-prize"
            style={{
              backgroundImage: `url(${this.state.gameScores.prizeList[i].thumb})`,
              opacity: i === this.state.prizeIndex ? 1 : 0,
            }}
          ></div>
        );
      }
    }
    if (this.state.status === "prize" && this.state.gameScores?.prize) {
      prizelist.push(
        <div
          key={"prize100"}
          className="g4-prize show-zoom"
          style={{
            backgroundImage: `url(${this.state.gameScores?.prize?.image})`,
            opacity: 1,
          }}
        ></div>
      );
    }

    return (
      <div className="g4 gamePage">
        <div
          className={
            "pageBg" + (this.state.status === "selection" ? "" : " changed")
          }
        ></div>
        {(this.state.status === "selection" ||
          this.state.status === "result") && (
          <div
            className="snowflake-container"
            style={{ opacity: this.state.status === "selection" ? 1 : 0 }}
          >
            <div className="pageBg-head-snowflake floating-large"></div>
            <div className="pageBg-head-snowflake floating-large"></div>
            <div className="pageBg-head-snowflake floating-large"></div>
          </div>
        )}

        <div
          className={
            "pageBg-head slow-pulsing" +
            (this.state.status !== "selection" ? " lifted" : "") +
            (this.state.status === "rotation" || this.state.status === "prize"
              ? " highlighted"
              : "")
          }
        ></div>
        <div className="screen-snow">
          {Array.from({ length: 30 }, (_, index) => (
            <div key={index} className="snowflake" />
          ))}
        </div>

        {this.state.resultReceived && (
          <div
            className="g4-sparking-container"
            style={{
              left: "50%",
              top: "50%",
            }}
          >
            {sparkParticles}
          </div>
        )}

        <div
          className="g4-card-container"
          style={{
            ...(this.state.status === "selection" ||
            this.state.status === "result"
              ? { opacity: 1, pointerEvents: "inherit" }
              : { opacity: 0, pointerEvents: "none" }),
          }}
        >
          {!this.props.bounds.mobileSize && (
            <div className="g4-card-holder show-zoom">{cards}</div>
          )}
          {this.props.bounds.mobileSize && (
            <div
              className="g4-card-slider show-zoom"
              onPointerDown={this.scene_downHandler}
              onPointerMove={this.scene_moveHandler}
              onPointerUp={this.scene_upHandler}
            >
              <div
                className="g4-card-slider-container"
                style={{
                  left: 80 + -this.state.selected * 290,
                }}
              >
                {cards}
              </div>
            </div>
          )}
        </div>

        {(this.state.status === "rotation" ||
          this.state.status === "prize") && (
          <div className="g4-prize-container show-zoom">
            <div
              className={
                "g4-prize-layer" +
                (this.state.status === "rotation" ? " pulsing" : " accent")
              }
            >
              <div className="g4-prize-sun"></div>

              <div
                className="g4-gifting-container"
                style={{
                  left: "50%",
                  top: "50%",
                }}
              >
                {giftParticles}
              </div>

              {prizelist}
            </div>
          </div>
        )}

        <div className="g4-top-texts appear-top">
          {!this.state.resultReceived && (
            <div
              className="g4-select-title"
              dangerouslySetInnerHTML={{ __html: gameCredentials?.tip }}
            ></div>
          )}
          {this.state.status === "result" &&
            this.state.resultReceived &&
            this.state.gameScores?.prize && (
              <div className="g4-select-title caps">
                <div className="show-zoom">Ура, ты нашел Тайного Лосянту!</div>
              </div>
            )}
          {this.state.status === "result" &&
            this.state.resultReceived &&
            !this.state.gameScores?.prize && (
              <div className="g4-select-title caps">
                <div className="show-zoom">
                  Тайный лосянта всё ещё не&nbsp;раскрыт!
                </div>
              </div>
            )}
          {(this.state.status === "rotation" ||
            this.state.status === "prize") && (
            <div className="g4-select-title caps">
              <div className="show-zoom">И твой приз:</div>
            </div>
          )}
          {this.state.status === "prize" && (
            <div className="g4-select-subtitle caps">
              <div
                className="show-zoom"
                dangerouslySetInnerHTML={{
                  __html: this.state.gameScores?.prize?.name,
                }}
              ></div>
            </div>
          )}
        </div>
        <div className="g4-bottom-texts appear-bottom">
          {!this.props.bounds.mobileSize && (
            <>
              {this.state.status === "selection" && (
                <>
                  <div className="g4-select-hint">
                    Нажми мышкой на картинку для выбора лосика
                  </div>
                </>
              )}
            </>
          )}
          {this.props.bounds.mobileSize && (
            <>
              {this.state.status === "selection" && (
                <>
                  <div className="g4-select-hint">
                    Просматривай карточки, нажми на кнопку для подтверждения
                    выбора
                  </div>
                  <div
                    className="primary-button button-large"
                    onClick={this.selectButton_clickHandler}
                  >
                    Подтвердить
                  </div>
                </>
              )}
            </>
          )}
          {((this.state.status === "result" &&
            !this.state.gameScores?.prize &&
            this.state.resultReceived) ||
            this.state.status === "prize") && (
            <div className="button-group">
              <div
                className="secondary-button small button appear-bottom delay500ms"
                onClick={this.closeButton_clickHandler}
              >
                Играть позже
              </div>
              {this.state.gameScores?.attemptsLeft > 0 && (
                <div
                  className="primary-button small button appear-bottom"
                  onClick={this.restartButton_clickHandler}
                >
                  Играть еще
                </div>
              )}
            </div>
          )}
        </div>

        <div
          className="pageOverlay"
          style={{
            visibility: this.state.finished ? "visible" : "hidden",
            opacity: this.state.finished ? 1 : 0,
            transitionDuration: this.state.game4.stopDuration + "ms",
          }}
        ></div>
      </div>
    );
  }
}

export default Game4Page;
