import React from "react";
import "../css/game5.css";
import GamePage from "./GamePage";
import CircularProgress from "../components/CircularProgress";
import { setStoreData } from "../actions/appActions";
import md5 from "md5";

class Game5Page extends GamePage {
  constructor(props) {
    super(props);

    let zRadius = Math.floor(this.state.game5.sceneWidth / (2 * Math.PI)) - 5;

    let scene =
      this.state.game5.scenes[
        Math.floor(Math.random() * this.state.game5.scenes.length)
      ];

    this.state = {
      ...this.state,
      gameDuration: this.state.game5.gameDuration,
      stopDuration: this.state.game5.stopDuration,
      startDuration: this.state.game5.startGameDuration,
      stepDuration: this.state.game5.stepDuration,
      winDuration: this.state.game5.winDuration,
      idle: true,
      rotation: 0,
      speed: this.state.game5.idleSpeed,
      rotation: 0,
      startRotation: 0,
      zRadius,
      scene,
      success: "none",
    };

    this.obj_clickHandler = this.obj_clickHandler.bind(this);
    this.scene_downHandler = this.scene_downHandler.bind(this);
    this.scene_moveHandler = this.scene_moveHandler.bind(this);
    this.scene_upHandler = this.scene_upHandler.bind(this);
  }

  registerStart() {}

  registerFinish(success) {
    let guid = this.state.gameCredentials?.guid;
    let userCode = this.state.gameCredentials?.userCode;
    let won = success ? 1 : 0;
    let hash = md5(userCode + guid + guid + guid + won);

    this.store.dispatch(
      setStoreData({
        requestFinish: {
          request: this.state.gameData.request2,
          data: {
            play: true,
            hash,
            guid,
            won,
          },
        },
      })
    );
  }

  finishGame(success) {
    if (this.stopTimer != null) clearTimeout(this.stopTimer);
    this.stopTimer = setTimeout(() => {
      this.setState({
        ...this.state,
        success: success ? "win" : "fail",
      });
      this.stopTimer = setTimeout(() => {
        this.registerFinish(success);

        if (this.stopTimer != null) clearTimeout(this.stopTimer);
        this.stopTimer = setTimeout(() => {
          if (!success) {
            this.store.dispatch(
              setStoreData({
                currentPage: "fail",
              })
            );
          } else {
            if (this.stopTimer != null) clearTimeout(this.stopTimer);
            this.stopTimer = setTimeout(() => {
              this.store.dispatch(
                setStoreData({
                  currentPage: "prize",
                })
              );
            }, this.state.winDuration);
          }
        }, this.state.stopDuration);
      }, this.state.stopDuration);
    }, this.state.stopDuration);
  }

  doGame() {
    let rotation = this.state.rotation;
    let speed = this.state.speed;

    if (this.state.idle) {
      let sign = Math.sign(speed);
      if (sign === 0) sign = 1;
      speed = Math.abs(speed);
      speed -= this.state.game5.inertia;
      if (speed < this.state.game5.idleSpeed)
        speed = this.state.game5.idleSpeed;
      speed *= sign;
      rotation += speed;
    }

    this.setState({
      ...this.state,
      rotation,
      speed,
    });
    return true;
  }

  obj_clickHandler(event) {
    console.log(
      event.target.id,
      event.nativeEvent.offsetX,
      event.nativeEvent.offsetY
    );

    if (this.state.finished) return;

    let r = this.state.game5.objectRadius;

    let found = this.state.scene.objects.filter(
      (v) =>
        v.area == event.target.id &&
        event.nativeEvent.offsetX > v.x - r &&
        event.nativeEvent.offsetX < v.x + r &&
        event.nativeEvent.offsetY > v.y - r &&
        event.nativeEvent.offsetY < v.y + r
    );

    if (found.length > 0) {
      this.stopGame();
      this.finishGame(true);
    }
  }

  scene_downHandler(event) {
    if (this.state.finished) return;
    let idle = false;
    let speed = 0;
    let rotation = this.state.rotation;
    this.setState({
      ...this.state,
      idle,
      speed,
      startRotation: rotation,
    });
  }

  scene_moveHandler(event) {
    if (this.state.finished) return;
    if (!this.state.idle) {
      let speed = this.state.speed;
      let rotation = this.state.rotation;

      rotation +=
        (event.movementX * 180) /
        (this.state.zRadius * Math.PI) /
        (Math.PI / 2);

      speed = event.movementX;
      this.setState({
        ...this.state,
        speed,
        rotation,
      });
    }
  }

  scene_upHandler(event) {
    if (this.state.finished) return;
    let idle = true;
    this.setState({
      ...this.state,
      idle,
    });
  }

  render() {
    let sections = [];
    let zRadius = this.state.zRadius;
    for (let i = 0; i < this.state.game5.sectionCount; i++) {
      sections.push(
        <div
          className="g5-section"
          id={"s" + i}
          key={"s" + i}
          style={{
            left: 0,
            top: 0,
            width:
              this.state.game5.sceneWidth / this.state.game5.sectionCount +
              "px",
            height: this.state.game5.sceneHeight + "px",
            backgroundImage: "url(" + this.state.scene.src + ")",
            backgroundSize:
              this.state.game5.sceneWidth +
              "px " +
              this.state.game5.sceneHeight +
              "px",
            backgroundPosition:
              (i * this.state.game5.sceneWidth) /
                this.state.game5.sectionCount +
              "px 0px",
            transform:
              "rotateY(" +
              -(i * 360) / this.state.game5.sectionCount +
              "deg) translateZ(" +
              zRadius +
              "px)",
          }}
          onClick={this.obj_clickHandler}
        ></div>
      );
    }

    let time = this.state.game5.gameDuration - this.state.countdown;

    let particles = [];
    if (this.state.success === "win") {
      for (let j = 0; j < this.state.particlesCount * 10; j++) {
        particles.push(<div key={"p" + j} className="particle infinite"></div>);
      }
    }

    return (
      <div className="g5 gamePage">
        <div
          className="gameScene"
          onPointerDown={this.scene_downHandler}
          onPointerMove={this.scene_moveHandler}
          onPointerUp={this.scene_upHandler}
          onPointerLeave={this.scene_upHandler}
        >
          <div
            className="g5-gameScene"
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
            }}
          >
            <div
              className="g5-frame"
              style={{
                transform: this.props.bounds.mobileSize
                  ? "rotateX(0deg) rotateY(0deg) rotateZ(0deg) translate3d(" +
                    this.state.mobileBounds.width / 2 +
                    "px," +
                    (this.state.mobileBounds.height -
                      this.state.game5.sceneHeight *
                        this.state.game5.mobileScale) *
                      0.4 +
                    "px, 0px) scale(" +
                    this.state.game5.mobileScale +
                    ")"
                  : "rotateX(0deg) rotateY(0deg) rotateZ(0deg) translate3d(" +
                    this.state.desktopBounds.width / 2 +
                    "px," +
                    (this.state.desktopBounds.height -
                      this.state.game5.sceneHeight) /
                      2 +
                    "px, 0px)",
              }}
            >
              <div
                className="g5-cylinder"
                style={{
                  width: 0,
                  height: 0,
                  left: 0,
                  top: 0,
                  transform:
                    "rotateY(" + this.state.rotation + "deg) translateX(-33px)",
                  transition: this.state.idle
                    ? "transform " + this.state.game5.stepDuration + "ms linear"
                    : "transform " +
                      this.state.game5.dragDuration +
                      "ms linear",
                }}
              >
                {sections}
              </div>
            </div>
            <div className="g5-fade-left"></div>
            <div className="g5-fade-right"></div>
          </div>
        </div>
        <div
          className={"countdown display " + (time < 10 ? " warning" : "")}
          style={{
            animation: this.state.finished ? "none" : "",
            opacity: this.state.finished ? 0 : 1,
            transitionDuration: this.state.stopDuration + "ms",
          }}
        >
          <CircularProgress value={1 - time / this.state.game5.gameDuration}>
            {time}
          </CircularProgress>
        </div>
        <div
          className="hint-right"
          style={{
            opacity: this.state.finished ? 0 : 1,
            transitionDuration: this.state.stopDuration + "ms",
          }}
        >
          <div className="hint-item"></div>
          {!this.props.bounds.mobileSize && (
            <p>Вращай карту левой кнопкой мышки</p>
          )}
          {this.props.bounds.mobileSize && (
            <p>
              Вращай
              <br />
              карту для
              <br />
              поиска
            </p>
          )}
        </div>
        <div
          className="hint-left"
          style={{
            opacity: this.state.finished ? 0 : 1,
            transitionDuration: this.state.stopDuration + "ms",
          }}
        >
          <div className="hint-logo"></div>
          <p>Найди объект с&nbsp;логотипом «Пятёрочка»</p>
        </div>
        <div
          className="pageOverlay"
          style={{
            visibility: this.state.finished ? "visible" : "hidden",
            opacity: this.state.finished
              ? this.state.finished
                ? this.state.success === "win"
                  ? 0.8
                  : this.state.success === "fail"
                  ? 1
                  : 0
                : 1
              : 0,
            transitionDuration: this.state.stopDuration + "ms",
          }}
        ></div>
        <div className="pageOverlay disappear-opacity"></div>
        {this.state.success === "win" && (
          <>
            <div className="success-container">{particles}</div>
            <div className="head show-zoom">
              <h1>Ура, получилось!</h1>
            </div>
            <div className="success-container show-zoom">
              <div className="success"></div>
              <div className="success-decor spark"></div>
              <div className="success-decor spark delay3s"></div>
              <div className="five show-zoom delay300ms"></div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Game5Page;
