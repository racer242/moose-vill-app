import React from "react";
import "../css/game4.css";
import "../css/snow.scss";
import GamePage from "./GamePage";

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

  doStart() {
    super.doStart();
    this.setState({
      ...this.state,
      heroX: this.state.game4.heroXPosition,
    });
  }

  cardButton_clickHandler(event) {
    console.log(event.target.id);
  }

  selectButton_clickHandler(event) {
    console.log(this.state.game4.cardSources[this.state.selected].id);
  }

  scene_downHandler(event) {
    this.downX = event.clientX;
  }

  scene_moveHandler(event) {
    this.moveX = event.clientX;
  }

  scene_upHandler(event) {
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

  render() {
    let cards = [];
    for (let i = 0; i < this.state.game4.cardSources.length; i++) {
      let card = this.state.game4.cardSources[i];
      cards.push(
        <div
          className={"g4-card" + (this.state.selected === i ? " selected" : "")}
          id={card.id}
          key={card.id}
          style={{
            ...{
              left: card.x + "px",
            },
            ...(this.props.bounds.mobileSize ? {} : { top: card.y + "px" }),
          }}
          onClick={this.cardButton_clickHandler}
        >
          <div className={"g4-card-layer"}>
            <div
              className={"g4-card-image"}
              style={{
                ...{
                  backgroundImage: `url(${card.src})`,
                },
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

    let mobileScale =
      this.state.mobileBounds.height / this.state.desktopBounds.height;

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
        {!this.props.bounds.mobileSize && (
          <div className="g4-card-holder">{cards}</div>
        )}
        {this.props.bounds.mobileSize && (
          <div
            className="g4-card-slider"
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
          <div className="g4-select-title">
            Угадай, кто подарит всем свечи и скажет: «Чтобы у каждого был свой
            огонёк тепла»?
          </div>
        </div>
        <div className="g4-bottom-texts appear-bottom">
          {!this.props.bounds.mobileSize && (
            <div className="g4-select-hint">
              Нажми мышкой на картинку для выбора лосика
            </div>
          )}
          {this.props.bounds.mobileSize && (
            <>
              <div className="g4-select-hint">
                Просматривай карточки, нажми на кнопку для подтверждения выбора
              </div>
              <div
                className="primary-button button-large"
                onClick={this.selectButton_clickHandler}
              >
                Подтвердить
              </div>
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
