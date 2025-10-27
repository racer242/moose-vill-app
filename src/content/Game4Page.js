import React from "react";
import "../css/game4.css";
import "../css/snow.scss";
import "../css/sparking.scss";

import GamePage from "./GamePage";
import { setStoreData } from "../actions/appActions";
import md5 from "md5";

class Game4Page extends GamePage {
  constructor(props) {
    super(props);

    let columns = [];
    for (let i = 0; i < this.state.game4.startColumnCount; i++) {
      this.addColumn(columns);
    }

    this.state = {
      ...this.state,
      selected: 0,
      status: "selection",
    };

    this.downX = 0;
    this.moveX = 0;

    this.cardButton_clickHandler = this.cardButton_clickHandler.bind(this);
    this.scene_downHandler = this.scene_downHandler.bind(this);
    this.scene_moveHandler = this.scene_moveHandler.bind(this);
    this.scene_upHandler = this.scene_upHandler.bind(this);
    this.selectButton_clickHandler = this.selectButton_clickHandler.bind(this);
  }

  controlGame() {}
  stepGame() {}

  registerStart() {
    if (this.state.userNotAuthorized) return;
    this.store.dispatch(
      setStoreData({
        requestStart: {
          request: this.state.gameData.request1,
          data: { play: true, mode: "tip" },
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

  doStart() {
    super.doStart();
    this.setState({
      ...this.state,
    });
  }

  cardButton_clickHandler(event) {
    this.setState({
      ...this.state,
      selected: Number(event.target.id),
      status: "result",
    });
  }

  selectButton_clickHandler(event) {
    this.setState({
      ...this.state,
      status: "result",
    });
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
        this.setState({
          ...this.state,
          selected: Math.min(this.state.selected + 1, 2),
        });
      } else if (this.downX < this.moveX - this.state.game4.dragThreshold) {
        this.setState({
          ...this.state,
          selected: Math.max(this.state.selected - 1, 0),
        });
      }
    }
  }

  render() {
    let cards = [];
    let gameCredentials = this.state.gameCredentials ?? {};
    for (let i = 0; i < this.state.game4.cardSources.length; i++) {
      let card = this.state.game4.cardSources[i];
      let image = gameCredentials["elk" + (i + 1)];

      let style = {
        ...{
          left: card.x + "px",
        },
        ...(this.props.bounds.mobileSize ? {} : { top: card.y + "px" }),
      };
      style =
        this.state.status === "result"
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
          <div className={"g4-card-layer"}>
            <div
              className={"g4-card-image"}
              style={{
                ...(image
                  ? {
                      backgroundImage: `url(${image})`,
                    }
                  : {}),
                ...(this.props.bounds.mobileSize
                  ? {}
                  : { transform: `rotate(${card.rotation}deg)` }),
              }}
            ></div>
            <div
              className={"g4-card-frame"}
              style={{
                ...(this.props.bounds.mobileSize
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
        sparkParticles.push(<div key={"p" + i} className="sparking"></div>);
      }
    }

    return (
      <div className="g4 gamePage">
        <div className="pageBg"></div>
        <div>
          <div className="pageBg-head-snowflake floating-large"></div>
          <div className="pageBg-head-snowflake floating-large"></div>
          <div className="pageBg-head-snowflake floating-large"></div>
        </div>
        <div className="pageBg-head slow-pulsing"></div>
        <div className="screen-snow">
          {Array.from({ length: 30 }, (_, index) => (
            <div key={index} className="snowflake" />
          ))}
        </div>

        {this.state.status === "result" && (
          <div
            className="sparking-container"
            style={{
              left: "50%",
              top: "50%",
            }}
          >
            {sparkParticles}
          </div>
        )}

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

        <div className="g4-top-texts appear-top">
          <div
            className="g4-select-title"
            dangerouslySetInnerHTML={{ __html: gameCredentials?.tip }}
          ></div>
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
