import React from "react";
import "../css/game4.css";
import GamePage from "./GamePage";
import CircularProgress from "../components/CircularProgress";

class Game4Page extends GamePage {
  constructor(props) {
    super(props);

    let columns = [];
    for (let i = 0; i < this.state.game4.startColumnCount; i++) {
      this.addColumn(columns);
    }

    let position = this.state.game4.startPosition;

    this.state = {
      ...this.state,
      gameDuration: this.state.game4.gameDuration,
      stopDuration: this.state.game4.stopDuration,
      stepDuration: this.state.game4.stepDuration,
      bonuses: [],
      power: false,
      parallax1: 0,
      parallax2: 0,
      parallax3: 0,
      position,
      columns,
      heroX: this.state.game4.heroStartPosition,
      heroY: this.state.desktopBounds.height / 2,
      heroPower: this.state.game4.pushPower,
    };

    this.game_downHandler = this.game_downHandler.bind(this);
    this.game_upHandler = this.game_upHandler.bind(this);

    this.power = false;
    this.heroPower = this.state.game4.pushPower;
  }

  doStart() {
    super.doStart();
    this.setState({
      ...this.state,
      heroX: this.state.game4.heroXPosition,
    });
  }

  doGame() {
    let bonuses = this.state.bonuses;
    let scoreAdded = this.state.scoreAdded;

    bonuses = bonuses.filter((v) => v.status != "bonus-destroy");
    for (const bonus of bonuses) {
      if (bonus.status == "bonus-show") {
        bonus.life--;
        if (bonus.life < 0) {
          bonus.status = "bonus-destroy";
        }
        continue;
      }
      if (bonus.status == "bonus-on") {
        bonus.status = "bonus-show";
        scoreAdded = false;
        bonus.life = this.state.game4.bonusLife;
        continue;
      }
    }

    this.setState({
      ...this.state,
      bonuses,
    });
    return true;
  }

  render() {
    let bonuses = [];
    for (let i = 0; i < this.state.bonuses.length; i++) {
      let bonus = this.state.bonuses[i];
      let particles = [];
      if (bonus.value > 0) {
        for (let j = 0; j < this.state.particlesCount; j++) {
          particles.push(<div key={"p" + j} className="particle"></div>);
        }
      }
      bonuses.push(
        <div key={bonus.id}>
          <div
            className="particle-container"
            style={{
              left: bonus.cssX,
              top: bonus.cssY,
            }}
          >
            {particles}
          </div>
          <div
            className="bonus-box bonusUp display"
            id={bonus.id}
            style={{
              left: bonus.cssX,
              top: bonus.cssY,
            }}
          >
            <div className={"bonus g4" + (bonus.value > 0 ? "" : " negative")}>
              {bonus.value > 0 ? "+" + bonus.value : bonus.value}
            </div>
          </div>
        </div>
      );
    }

    let mobileScale =
      this.state.mobileBounds.height / this.state.desktopBounds.height;

    let time = this.state.game4.gameDuration - this.state.countdown;

    return (
      <div className="g4 gamePage">
        <div
          className="gameScene"
          onPointerDown={this.game_downHandler}
          onPointerUp={this.game_upHandler}
          onPointerLeave={this.game_upHandler}
        >
          <div
            className="g4-gameScene"
            style={{
              left: this.props.bounds.mobileSize
                ? (this.state.desktopBounds.width * mobileScale -
                    this.state.desktopBounds.width) /
                    2 -
                  this.state.game4.heroXPosition * mobileScale +
                  "px"
                : "50%",
              top: "50%",
              transform: this.props.bounds.mobileSize
                ? "translate(0, -50%)" + " scale(" + mobileScale + ")"
                : "translate(-50%, -50%)" + "",
              width: this.state.desktopBounds.width,
              height: this.state.desktopBounds.height,
            }}
          >
            {bonuses}
          </div>
        </div>
        <div className={"countdown display " + (time < 10 ? " warning" : "")}>
          <CircularProgress value={1 - time / this.state.game4.gameDuration}>
            {time}
          </CircularProgress>
        </div>
        <div
          className={
            "score display" + (this.state.scoreAdded > 0 ? " impulse" : "")
          }
        >
          {this.state.score}
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
