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

    let parallax1 = this.state.parallax1 - this.state.game4.parallaxSpeed1;
    let parallax2 = this.state.parallax2 - this.state.game4.parallaxSpeed2;
    let parallax3 = this.state.parallax3 - this.state.game4.parallaxSpeed3;
    let position = this.state.position - this.state.game4.parallaxSpeed3;
    let columns = this.state.columns;
    if (
      -position + this.state.desktopBounds.width >
      columns.length * this.state.game4.columnDistance
    ) {
      this.addColumn(columns);
    }

    if (this.power) {
      this.heroPower += this.state.game4.pushPower;
    }
    this.heroPower -= this.state.game4.heroWeight;

    let heroY = this.state.heroY;

    heroY -= this.heroPower;

    if (heroY < 0) {
      heroY = 0;
      this.heroPower = 0;
    }
    if (heroY > this.state.desktopBounds.height) {
      heroY =
        this.state.desktopBounds.height -
        this.state.game4.heroBounds.height +
        this.state.game4.heroBounds.offsetTop;
      this.heroPower = 0;
    }

    let hX = -this.state.position + this.state.heroX;
    let hY = heroY + this.state.game4.heroBounds.offsetTop;
    let prizeColumns = columns.filter(
      (v) =>
        v.prize &&
        v.prize.isOn &&
        Math.max(v.prize.l, hX) <
          Math.min(v.prize.r, hX + this.state.game4.heroBounds.width) &&
        Math.max(v.prize.t, hY) <
          Math.min(
            v.prize.b,
            hY +
              this.state.game4.heroBounds.height -
              this.state.game4.heroBounds.offsetTop
          )
    );

    let score = this.state.score;
    if (prizeColumns.length > 0) {
      let prize = prizeColumns[0].prize;
      prize.isOn = false;
      prize.status = "prize-off";
      scoreAdded = true;
      bonuses.push({
        id: "bonus" + this.counter++,
        cssX: prize.l + position,
        cssY: prize.t,
        value: this.state.game4.prizeValue,
        status: "bonus-on",
      });
      score += this.state.game4.prizeValue;
    }

    let hitColumns = columns.filter(
      (v) =>
        (v.x + position > -v.width &&
          Math.max(v.top.l, hX) <
            Math.min(v.top.r, hX + this.state.game4.heroBounds.width) &&
          Math.max(v.top.t, hY) <
            Math.min(
              v.top.b,
              hY +
                this.state.game4.heroBounds.height -
                this.state.game4.heroBounds.offsetTop
            )) ||
        (Math.max(v.bottom.l, hX) <
          Math.min(v.bottom.r, hX + this.state.game4.heroBounds.width) &&
          Math.max(v.bottom.t, hY) <
            Math.min(
              v.bottom.b,
              hY +
                this.state.game4.heroBounds.height -
                this.state.game4.heroBounds.offsetTop
            ))
    );

    let collision = null;
    if (hitColumns.length > 0) {
      this.stopGame();
      this.finishGame();
      collision = [];
      for (let i = 0; i < 3; i++) {
        let direction =
          Math.PI / 8 + (Math.PI * i) / 10 + (Math.random() * Math.PI) / 20;
        let distance =
          this.state.game4.collisionStart +
          Math.random() * this.state.game4.collisionDistance;
        collision.push({
          x: Math.cos(direction) * distance,
          y: Math.sin(direction) * distance,
        });
      }
    }

    this.setState({
      ...this.state,

      bonuses,
      parallax1,
      parallax2,
      parallax3,
      position,
      columns,
      heroY,
      heroPower: this.heroPower,
      score,
      collision,
      scoreAdded,
    });
    return !collision;
  }

  game_downHandler(e) {
    e.stopPropagation();
    e.preventDefault();
    e.bubbles = false;
    this.power = true;
    // console.log(this.state.isMobile);
    this.heroPower += this.state.game4.pushPower;
  }
  game_upHandler(e) {
    e.stopPropagation();
    e.preventDefault();
    e.bubbles = false;
    if (this.upTimer != null) clearTimeout(this.upTimer);
    this.upTimer = setTimeout(() => {
      this.power = false;
    }, this.state.stepDuration);
  }

  addColumn(columns) {
    let column = {
      id: "column" + this.counter++,
      top: {
        ...this.state.game4.topSources[
          Math.floor(Math.random() * this.state.game4.topSources.length)
        ],
      },
      bottom: {
        ...this.state.game4.bottomSources[
          Math.floor(Math.random() * this.state.game4.topSources.length)
        ],
      },
    };
    let numColumns = columns.length;
    column.width = Math.max(column.top.width, column.bottom.width);
    column.height =
      column.top.height + column.bottom.height + this.state.game4.columnGap;

    column.x = numColumns * this.state.game4.columnDistance;
    column.y =
      (this.state.desktopBounds.height - column.height) / 2 +
      (0.5 - Math.random()) * this.state.game4.columnOffset;

    if (Math.random() > this.state.game4.prizeProb) {
      column.prize = {
        isOn: true,
        status: "prize-on",
        ...this.state.game4.prizeSources[
          Math.floor(Math.random() * this.state.game4.prizeSources.length)
        ],
        ...this.state.game4.prizeBounds,
        x: (column.width - this.state.game4.prizeBounds.width) / 2,
        y:
          column.height -
          column.bottom.height -
          this.state.game4.prizeBounds.gap -
          this.state.game4.prizeBounds.height,
        glow: this.state.game4.prizeBounds.glow,
        glowX: (column.width - this.state.game4.prizeBounds.glow) / 2,
        glowY:
          column.height -
          column.bottom.height -
          this.state.game4.prizeBounds.glow,
      };
      column.prize.l = column.x + column.prize.x;
      column.prize.r = column.x + column.prize.x + column.prize.width;
      column.prize.t = column.y + column.prize.y;
      column.prize.b = column.y + column.prize.y + column.prize.height;
    }
    column.top.l = column.x + column.top.ml;
    column.top.r = column.x + column.top.width - column.top.mr;
    column.top.t = column.y + column.top.mt;
    column.top.b = column.y + column.top.height - column.top.mb;

    column.bottom.l = column.x + column.bottom.ml;
    column.bottom.r = column.x + column.bottom.width - column.bottom.mr;
    column.bottom.t =
      column.y + column.height - column.bottom.height + column.bottom.mt;
    column.bottom.b = column.y + column.height - column.bottom.mb;
    columns.push(column);
  }

  render() {
    let columns = [];

    let start = Math.max(this.state.columns.length - 5);

    for (let i = start; i < this.state.columns.length; i++) {
      let column = this.state.columns[i];
      if (column.x + this.state.position > -column.width)
        columns.push(
          <div
            className="g4-column"
            id={column.id}
            key={column.id}
            style={{
              left: column.x,
              top: column.y,
              width: column.width,
              height: column.height,
            }}
          >
            <div
              className="g4-columnTop"
              style={{
                backgroundImage: `url(${column.top.src})`,
                width: column.top.width,
                height: column.top.height,
                top: 0,
              }}
            ></div>
            <div
              className="g4-columnBottom"
              style={{
                backgroundImage: `url(${column.bottom.src})`,
                width: column.bottom.width,
                height: column.bottom.height,
                bottom: 0,
              }}
            ></div>
            {column.prize && (
              <>
                <div
                  className={"g4-prize-glow g4-" + column.prize.status}
                  style={{
                    left: column.prize.glowX,
                    top: column.prize.glowY,
                    width: column.prize.glow,
                    height: column.prize.glow,
                  }}
                ></div>
                <div
                  className={"g4-prize g4-" + column.prize.status}
                  style={{
                    left: column.prize.x,
                    top: column.prize.y,
                    width: column.prize.width,
                    height: column.prize.height,
                    backgroundImage: "url(" + column.prize.src + ")",
                  }}
                ></div>
              </>
            )}
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
            <div
              className="g4-parallax1"
              style={{
                backgroundPositionX: this.state.parallax1,
                transitionDuration: this.state.game4.stepDuration + "ms",
              }}
            ></div>
            <div
              className="g4-parallax2"
              style={{
                backgroundPositionX: this.state.parallax2,
                transitionDuration: this.state.game4.stepDuration + "ms",
              }}
            ></div>
            <div
              className="g4-parallax3"
              style={{
                backgroundPositionX: this.state.parallax3,
                transitionDuration: this.state.game4.stepDuration + "ms",
              }}
            ></div>
            <div
              className="g4-columns"
              style={{
                transform: "translateX(" + this.state.position + "px)",
                transitionDuration: this.state.game4.stepDuration + "ms",
              }}
            >
              {columns}
            </div>
            <div
              className="g4-hero"
              style={{
                left: this.state.heroX,
                transform: "translateY(" + this.state.heroY + "px)",
                width: this.state.game4.heroBounds.width,
                height: this.state.game4.heroBounds.height,
                transition:
                  "transform " +
                  this.state.game4.stepDuration +
                  "ms steps(100), " +
                  "left " +
                  this.state.game4.goHorizontalDuration +
                  "ms ease-out",
              }}
            >
              <div
                className={"g4-hero-flame-container"}
                style={
                  this.state.collision
                    ? {
                        opacity: 0,
                      }
                    : this.power
                    ? { transform: "rotate(-20deg) translateY(10px)" }
                    : {}
                }
              >
                <div className="g4-hero-flame"></div>
              </div>
              <div
                className={
                  "g4-hero-guitar" +
                  (this.state.collision ? " g4-collision" : "")
                }
                style={
                  this.state.collision
                    ? {
                        left: this.state.collision[2].x,
                        top: this.state.collision[2].y,
                      }
                    : this.power
                    ? { transform: "rotate(-20deg)" }
                    : {}
                }
              ></div>
              <div
                className={
                  "g4-hero-cap" + (this.state.collision ? " g4-collision" : "")
                }
                style={
                  this.state.collision
                    ? {
                        left: this.state.collision[1].x,
                        top: this.state.collision[1].y,
                      }
                    : this.heroPower < 0
                    ? {
                        transform: "translateY(" + this.heroPower + "px)",
                      }
                    : {}
                }
              ></div>
              <div
                className={
                  "g4-hero-glasses" +
                  (this.state.collision ? " g4-collision" : "")
                }
                style={
                  this.state.collision
                    ? {
                        left: this.state.collision[0].x,
                        top: this.state.collision[0].y,
                      }
                    : this.heroPower < 0
                    ? {
                        transform: "translateY(" + this.heroPower / 2 + "px)",
                      }
                    : {}
                }
              ></div>
            </div>
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
