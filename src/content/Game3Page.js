import React from "react";
import "../css/game3.css";
import GamePage from "./GamePage";
import { shuffle } from "../utils/arrayTools";
import CircularProgress from "../components/CircularProgress";

class Game3Page extends GamePage {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      gameDuration: this.state.game3.gameDuration,
      stopDuration: this.state.game3.stopDuration,
      stepDuration: this.state.game3.stepDuration,
      bonuses: [],
      win: false,
      ...this.fillBalls(),
      userSequence: [],
      isStarting: true,
      isPlaying: false,
      playingBallIndex: -1,
      isRepeating: false,
      repeatingBallIndex: 0,
    };

    this.ball_clickHandler = this.ball_clickHandler.bind(this);
  }

  fillBalls() {
    let balls = [];
    let sequence = [];
    for (let i = 0; i < this.state.game3.ballSources.length; i++) {
      let ball = this.state.game3.ballSources[i];
      balls.push({
        ...ball,
        selected: false,
      });
      sequence.push({
        ...ball,
        revealed: false,
      });
    }
    shuffle(sequence);
    return { balls, sequence };
  }

  doStart() {
    this.start();
  }

  stopGame() {
    super.stopGame();
    clearTimeout(this.startTimeout);
    clearTimeout(this.startPlayingTimeout);
    clearTimeout(this.startRepeatingTimeout);
  }

  start() {
    this.startTimeout = setTimeout(() => {
      this.setState({
        ...this.state,
        isStarting: true,
        isPlaying: false,
        win: false,
        ...this.fillBalls(),
        userSequence: [],
        playingBallIndex: -1,
        isRepeating: false,
        repeatingBallIndex: 0,
      });

      this.startPlayingTimeout = setTimeout(() => {
        this.countdown = 0;
        this.setState({
          ...this.state,
          isStarting: false,
          isPlaying: true,
          playingBallIndex: 0,
          countdown: this.countdown,
        });

        this.playing();
      }, 3000);
    }, 100);
  }

  playing() {
    this.startRepeatingTimeout = setTimeout(() => {
      let playingBallIndex = this.state.playingBallIndex + 1;
      let isRepeating = playingBallIndex >= this.state.sequence.length;
      this.setState({
        ...this.state,
        isPlaying: false,
        playingBallIndex,
        isRepeating,
      });

      if (!isRepeating) {
        this.playing();
      }
    }, this.state.game3.playingBallDuration);
  }

  doGame() {
    if (this.state.isRepeating) {
      let score = this.state.game3.gameDuration - this.state.countdown;
      this.setState({
        ...this.state,
        score,
      });
    }
    return true;
  }

  ball_clickHandler(event) {
    if (this.state.finished) return;
    let ballId = event.currentTarget.id;
    let sequence = this.state.sequence;
    let balls = this.state.balls;
    let win = this.state.win;
    let repeatingBallIndex = this.state.repeatingBallIndex;
    let sequenceBall = sequence[repeatingBallIndex];
    if (sequenceBall.id === ballId) {
      sequence[repeatingBallIndex].revealed = true;
      let ball = balls.filter((v) => v.id === ballId)[0];
      ball.selected = true;
      repeatingBallIndex++;
      if (repeatingBallIndex >= sequence.length) {
        win = true;

        if (this.gameTimer != null) clearTimeout(this.gameTimer);
        this.gameTimer = null;
        if (this.countdownTimer != null) clearTimeout(this.countdownTimer);
        this.countdownTimer = null;
        this.started = false;

        this.finishingTimeout = setTimeout(() => {
          this.stopGame();
          this.finishGame();
        }, this.state.game3.finishingDuration);
      }
    } else {
      repeatingBallIndex = 0;
      balls = balls.map((v) => {
        v.selected = false;
        return v;
      });
    }

    this.setState({
      ...this.state,
      sequence,
      balls,
      repeatingBallIndex,
      win,
    });
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
            pointerEvents:
              this.state.isRepeating && !this.state.finished && !ball.selected
                ? "all"
                : "none",
          }}
          onClick={this.ball_clickHandler}
        >
          <div
            className={"g3-ball-light" + (this.state.win ? " flicker" : "")}
            style={{
              backgroundImage: `url(${ball.srcLight})`,
              opacity:
                ball.id ===
                  this.state.sequence[this.state.playingBallIndex]?.id ||
                ball.selected
                  ? 1
                  : 0,
            }}
          ></div>
          <div
            className="g3-ball-hover"
            style={{
              backgroundImage: `url(${ball.srcLight})`,
            }}
          ></div>
        </div>
      );
    }

    let sequence = [];
    for (let i = 0; i < this.state.sequence.length; i++) {
      let ball = this.state.sequence[i];
      sequence.push(
        <div
          key={ball.id}
          id={ball.id}
          className="g3-sequence-ball"
          style={
            ball.revealed
              ? {
                  backgroundImage: `url(${ball.src})`,
                }
              : {}
          }
        >
          <div
            className={
              "g3-sequence-ball-empty" +
              (this.state.isRepeating && this.state.repeatingBallIndex === i
                ? " searching-ball"
                : "")
            }
            style={{
              visibility: !ball.revealed ? "visible" : "hidden",
              // backgroundImage: `url(${ball.src})`,
              // opacity: ball.revealed ? "1" : "0.5",
            }}
          ></div>
          <div
            className="g3-sequence-ball-light"
            style={{
              backgroundImage: `url(${ball.srcLight})`,
              visibility:
                ball.revealed && this.state.repeatingBallIndex === i
                  ? "visible"
                  : "hidden",
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

    let time = this.state.isStarting
      ? 4 - this.state.countdown
      : this.state.game3.gameDuration - this.state.countdown;
    let timeLeft = this.state.isStarting
      ? Math.max(1 + 1 / 3 - time / 3, 0)
      : 1 - time / this.state.game3.gameDuration;
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
        <div
          className={
            "countdown display " +
            (time < 10 && !this.state.isStarting ? " warning" : "") +
            (this.state.isStarting ? " is-starting" : "")
          }
        >
          <CircularProgress value={timeLeft}>{time}</CircularProgress>
        </div>
        <div className="g3-sequence-container">{sequence}</div>

        {this.state.isStarting && (
          <>
            <div
              className="g3-start-message appear-start-message"
              style={{ animationDelay: "0ms" }}
            >
              <h2>Приготовься</h2>
            </div>
            <div
              className="g3-start-message appear-start-message"
              style={{ animationDelay: "1000ms" }}
            >
              <h2>Внимание</h2>
            </div>
            <div
              className="g3-start-message appear-start-message"
              style={{ animationDelay: "2000ms" }}
            >
              <h2>Поехали!</h2>
            </div>
          </>
        )}

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
