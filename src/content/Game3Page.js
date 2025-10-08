import React from "react";
import "../css/game3.css";
import GamePage from "./GamePage";
import CircularProgress from "../components/CircularProgress";

class Game3Page extends GamePage {
  constructor(props) {
    super(props);

    let balls = [];
    for (let i = 0; i < this.state.game3.ballSources.length; i++) {
      let ball = this.state.game3.ballSources[i];
      balls.push({
        ...ball,
        selected: false,
      });
    }

    this.state = {
      ...this.state,
      bonuses: [],
      win: false,
      balls,
    };
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
        bonus.life = this.state.game3.bonusLife;
        continue;
      }
    }

    let score = this.state.game3.gameDuration - this.state.countdown;

    this.setState({
      ...this.state,
      bonuses,
      scoreAdded,
      score,
    });
    return true;
  }

  render() {
    let balls = [];
    for (let i = 0; i < this.state.balls.length; i++) {
      let ball = this.state.balls[i];
      balls.push(
        <div
          key={ball.id}
          id={ball.id}
          className="g3-ball"
          style={{
            left: ball.x,
            top: ball.y,
            backgroundImage: `url(${ball.src})`,
          }}
        >
          <div
            className={"g3-ball-light" + (this.state.win ? " flicker" : "")}
            style={{
              backgroundImage: `url(${ball.srcLight})`,
              visibility: ball.selected ? "visible" : "hidden",
            }}
          ></div>
        </div>
      );
    }

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
        </div>
      );
    }

    let time = this.state.game3.gameDuration - this.state.countdown;
    let timeLeft = 1 - time / this.state.game3.gameDuration;
    return (
      <div className="g3 gamePage">
        <div className="gameScene">
          <div
            className="g3-gameScene"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: this.props.bounds.mobileSize
                ? this.state.mobileBounds.width
                : this.state.desktopBounds.width,
              height: this.props.bounds.mobileSize
                ? this.state.mobileBounds.height
                : this.state.desktopBounds.height,
              pointerEvents: this.state.activityEnabled ? "all" : "none",
            }}
          >
            <div
              className="g3-gameSceneBg"
              style={{
                width: this.props.bounds.mobileSize
                  ? this.state.mobileBounds.width
                  : this.state.desktopBounds.width,
                height: this.props.bounds.mobileSize
                  ? this.state.mobileBounds.height
                  : this.state.desktopBounds.height,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            ></div>

            <div className="g3-house-lights"></div>

            <div className="g3-house-flick-lights fl1"></div>
            <div className="g3-house-flick-lights fl2"></div>
            <div className="g3-house-flick-lights fl3"></div>

            <div className="g3-moose moose1"></div>

            <div className="g3-moose moose3"></div>

            <div className="g3-tree">
              <div
                className={
                  "g3-tree-lights l1" + (this.state.win ? " fast" : "")
                }
              ></div>
              <div
                className={
                  "g3-tree-lights l2" + (this.state.win ? " fast" : "")
                }
              ></div>
              <div
                className={
                  "g3-tree-lights l3" + (this.state.win ? " fast" : "")
                }
              ></div>
              {this.state.win && (
                <>
                  <div className="g3-tree-balls b1"></div>
                  <div className="g3-tree-balls b2"></div>
                  <div className="g3-tree-balls b3"></div>
                  <div className="g3-star-light"></div>
                </>
              )}
              <div>{balls}</div>
            </div>
            <div className="g3-moose moose2"></div>
          </div>
        </div>
        <div className={"countdown display " + (time < 10 ? " warning" : "")}>
          <CircularProgress value={timeLeft}>{time}</CircularProgress>
        </div>
        <div
          className="pageOverlay"
          style={{
            visibility: this.state.finished ? "visible" : "hidden",
            opacity: this.state.finished ? 1 : 0,
            transitionDuration: this.state.game3.stopDuration + "ms",
          }}
        ></div>
      </div>
    );
  }
}

export default Game3Page;
