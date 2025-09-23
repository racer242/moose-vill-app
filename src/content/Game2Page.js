import React from "react";
import "../css/game2.css";
import GamePage from "./GamePage";
import CircularProgress from "../components/CircularProgress";
import { ReactComponent as RAY_RED } from "../images/game2/ray-red.svg";
import { ReactComponent as RAY_PINK } from "../images/game2/ray-pink.svg";
import { ReactComponent as RAY_PURPLE } from "../images/game2/ray-purple.svg";
import { ReactComponent as RAY_YELLOW } from "../images/game2/ray-yellow.svg";
import { ReactComponent as BLOB1 } from "../images/game2/blobs/b1.svg";
import { ReactComponent as BLOB2 } from "../images/game2/blobs/b2.svg";
import { ReactComponent as BLOB3 } from "../images/game2/blobs/b3.svg";
import { ReactComponent as BLOB4 } from "../images/game2/blobs/b4.svg";
import { ReactComponent as PIE } from "../images/game2/blobs/pie.svg";

class Game2Page extends GamePage {
  constructor(props) {
    super(props);

    let objects = [];
    for (let i = 0; i < this.state.game2.objSources.length; i++) {
      objects.push({
        ...this.state.game2.objSources[i],
        id: "obj" + this.counter++,
        status: "obj-off",
        life: this.state.game2.deadCount,
      });
    }

    this.state = {
      ...this.state,
      gameDuration: this.state.game2.gameDuration,
      stopDuration: this.state.game2.stopDuration,
      stepDuration: this.state.game2.stepDuration,
      objects,
      bonuses: [],
    };
    this.state.currentObject = this.getNextObject();

    this.refLight = React.createRef();
    this.refScene = React.createRef();

    this.scene_moveHandler = this.scene_moveHandler.bind(this);
  }

  getNextObject() {
    let objects = this.state.objects;
    let currentObject = this.state.currentObject;
    let nextObject;
    do {
      nextObject = objects[Math.floor(Math.random() * objects.length)];
    } while (currentObject === nextObject);
    return nextObject;
  }

  doStart() {
    super.doStart();
    this.lightContainer = this.refLight.current;
    this.lightScene = this.refScene.current;

    this.lightContainer.style.left =
      (this.state.desktopBounds.width - this.state.game2.lightSize) / 2 + "px";
    this.lightContainer.style.top =
      (this.state.desktopBounds.height - this.state.game2.lightSize) / 2 + "px";
  }

  doGame() {
    let objects = this.state.objects;
    let bonuses = this.state.bonuses;
    let obj = this.state.currentObject;
    let scoreAdded = this.state.scoreAdded;

    bonuses = bonuses.filter((v) => v.status != "bonus-destroy");
    for (const bonus of bonuses) {
      if (bonus.status == "bonus-show") {
        bonus.life--;
        if (bonus.life < 0) {
          bonus.status = "bonus-destroy";
        }
      }
      if (bonus.status == "bonus-on") {
        bonus.status = "bonus-show";
        scoreAdded = false;
        bonus.life = this.state.game2.bonusLife;
      }
    }

    if (obj.status == "obj-show") {
      obj.life--;
      if (obj.life < 0) {
        obj.status = "obj-on";
        obj.life =
          Math.random() * this.state.game2.lifeCount +
          this.state.game2.lifeCount;
      }
    } else if (obj.status == "obj-hide") {
      obj.life--;
      if (obj.life < 0) {
        obj.status = "obj-off";
        obj.life =
          Math.random() * this.state.game2.deadCount +
          this.state.game2.deadCount;

        obj = this.getNextObject();
      }
    } else if (obj.status == "obj-off") {
      obj.life--;
      if (obj.life < 0) {
        obj.status = "obj-show";
        obj.life = this.state.game2.switchCount;
      }
    } else if (obj.status == "obj-on") {
      obj.life--;
      if (obj.life < 0) {
        obj.status = "obj-hide";
        obj.life = this.state.game2.switchCount;
      }
    } else if (obj.status == "obj-kill") {
      obj.life--;
      if (obj.life < 0) {
        obj.status = "obj-off";
        obj.life =
          Math.random() * this.state.game2.deadCount +
          this.state.game2.deadCount;
      }
      obj = this.getNextObject();
    } else if (obj.status == "obj-killing") {
      obj.life--;
      if (obj.life < 0) {
        obj.status = "obj-kill";
        obj.life =
          Math.random() * this.state.game2.killCount +
          this.state.game2.killCount;
      }
    }

    this.setState({
      ...this.state,
      objects,
      bonuses,
      currentObject: obj,
      scoreAdded,
    });
    return true;
  }

  scene_moveHandler(event) {
    if (this.state.finished) return;
    let b = event.currentTarget.getBoundingClientRect();
    let x = (event.clientX - b.x) / this.props.bounds.pageScale;
    let y = (event.clientY - b.y) / this.props.bounds.pageScale;

    if (this.props.bounds.mobileSize) {
      x /= this.state.game2.mobileScale;
      y /= this.state.game2.mobileScale;
    }

    let lx = x - this.state.game2.lightSize / 2;
    let ly = y - this.state.game2.lightSize / 2;

    this.lightContainer.style.left = lx + "px";
    this.lightContainer.style.top = ly + "px";
    this.lightScene.style.left = -lx + "px";
    this.lightScene.style.top = -ly + "px";

    let changed = false;
    let objects = this.state.objects;
    let bonuses = this.state.bonuses;
    let score = 0;

    let objs = this.state.objects.filter(
      (v) => v.x < x && v.x + v.width > x && v.y < y && v.y + v.height > y
    );

    let obj = objs.length > 0 ? objs[0] : null;
    if (obj) {
      if (obj.status == "obj-on" || obj.status == "obj-hide") {
        obj.status = "obj-killing";
        obj.life = this.state.game2.killingCount;
        changed = true;

        let bonusValue = obj.type.bonus;
        score = Math.max(this.state.score + bonusValue, 0);
        bonuses.push({
          id: "bonus" + this.counter++,
          cssX: x + this.state.game2.lightSize / 2 + "px",
          cssY: y - this.state.game2.lightSize / 4 + "px",
          value: bonusValue,
          status: "bonus-on",
        });

        this.setState({
          ...this.state,
          objects,
          bonuses,
          score,
          scoreAdded: bonusValue > 0,
        });
      }
    }
  }

  render() {
    let objs = [];
    for (let i = 0; i < this.state.objects.length; i++) {
      let obj = this.state.objects[i];
      objs.push(
        <div
          className={
            "g2-gameObjectBox " +
            "g2-" +
            obj.status +
            (this.state.finished ? " g2-obj-stop" : "")
          }
          id={obj.id}
          key={obj.id}
          style={{
            left: obj.x,
            top: obj.y,
            width: obj.width,
            height: obj.height,
            transitionDuration: this.state.game2.transitionDuration + "ms",
            transitionDelay:
              Math.random() * this.state.game2.transitionDuration + "ms",
          }}
          onClick={this.objButton_clickHandler}
        >
          <div
            className={"g2-gameObject swing"}
            style={{
              backgroundImage: `url(${obj.type.src})`,
              pointerEvents: "none",
            }}
          ></div>
        </div>
      );
    }

    let decors = [];
    for (let i = 0; i < this.state.game2.decorSources.length; i++) {
      let decor = this.state.game2.decorSources[i];
      decors.push(
        <div
          className="g2-gameObjectBox"
          id={"decor" + i}
          key={"decor" + i}
          style={{
            left: decor.x,
            top: decor.y,
            width: decor.width,
            height: decor.height,
          }}
        >
          <div
            className={"g2-gameObject sprites"}
            style={{
              backgroundImage: `url(${decor.type.src})`,
              pointerEvents: "none",
              backgroundSize: decor.width * 8 + "px " + decor.height + "px",
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
          <div
            className="bonus-box bonusUp display"
            id={bonus.id}
            style={{
              left: bonus.cssX,
              top: bonus.cssY,
            }}
          >
            <div className={"bonus g1" + (bonus.value > 0 ? "" : " negative")}>
              {bonus.value > 0 ? "+" + bonus.value : bonus.value}
            </div>
          </div>
        </div>
      );
    }

    let time = this.state.game2.gameDuration - this.state.countdown;

    return (
      <div className="g2 gamePage">
        <div className="gameScene">
          <div
            className="g2-gameScene"
            style={{
              left: "50%",
              top: "50%",
              transform:
                "translate(-50%, -50%)" +
                (this.props.bounds.mobileSize
                  ? " scale(" + this.state.game2.mobileScale + ")"
                  : ""),
              width: this.state.desktopBounds.width,
              height: this.state.desktopBounds.height,
            }}
            onPointerDown={this.scene_moveHandler}
            onPointerMove={this.scene_moveHandler}
          >
            <div className="g2-decorLayer">
              <div className="rays">
                <RAY_RED className="ray lights-even" style={{ left: -20 }} />
                <RAY_PURPLE className="ray lights" style={{ left: 0 }} />
                <RAY_YELLOW className="ray lights-even" style={{ left: 28 }} />
                <RAY_PINK className="ray lights" style={{ left: 59 }} />
                <RAY_RED className="ray lights-even" style={{ left: 81 }} />
                <RAY_PURPLE className="ray lights" style={{ left: 119 }} />
                <RAY_YELLOW className="ray lights-even" style={{ left: 151 }} />
                <RAY_PINK className="ray lights" style={{ left: 182 }} />
                <RAY_RED className="ray lights-even" style={{ left: 213 }} />
                <RAY_PURPLE className="ray lights" style={{ left: 233 }} />
                <RAY_YELLOW className="ray lights-even" style={{ left: 266 }} />
                <RAY_PINK className="ray lights" style={{ left: 288 }} />
                <RAY_RED className="ray lights-even" style={{ left: 315 }} />
              </div>
              {!this.props.bounds.mobileSize && (
                <>
                  <div className="music-left music-box"></div>
                  <div className="music-right music-box"></div>
                  <div className="panel-left">
                    <div
                      className="blob"
                      style={{ left: "-140%", top: "-70%" }}
                    >
                      <BLOB3
                        width={"250%"}
                        height={"250%"}
                        className="blob-body red"
                      />
                    </div>
                    <div className="pie" style={{ left: "0%", top: "0%" }}>
                      <PIE
                        width={"30%"}
                        height={"30%"}
                        style={{ left: "30%", top: "0%" }}
                        className="pie-body red"
                      />
                    </div>
                    <div className="blob" style={{ left: "-80%", top: "0%" }}>
                      <BLOB1
                        className="blob-body cyan"
                        width={"150%"}
                        height={"100%"}
                        preserveAspectRatio="none"
                      />
                    </div>
                    <div className="blob" style={{ left: "-60%", top: "-10%" }}>
                      <BLOB2
                        className="blob-body purple"
                        width={"110%"}
                        height={"110%"}
                      />
                    </div>
                  </div>
                  <div className="panel-right">
                    <div className="blob" style={{ left: "10%", top: "-140%" }}>
                      <BLOB3
                        width={"350%"}
                        height={"350%"}
                        className="blob-body red"
                      />
                    </div>
                    <div className="pie" style={{ left: "30%", top: "0%" }}>
                      <PIE
                        width={"20%"}
                        height={"20%"}
                        style={{ left: "20%", top: "0%" }}
                        className="pie-body yellow"
                      />
                    </div>
                    <div className="blob" style={{ left: "30%", top: "0%" }}>
                      <BLOB1
                        className="blob-body purple"
                        width={"180%"}
                        height={"100%"}
                        preserveAspectRatio="none"
                      />
                    </div>
                    <div className="blob" style={{ left: "60%", top: "-20%" }}>
                      <BLOB4
                        className="blob-body cyan"
                        width={"110%"}
                        height={"160%"}
                      />
                    </div>
                  </div>
                </>
              )}
              {this.props.bounds.mobileSize && (
                <>
                  <div className="music-top music-box"></div>
                  <div className="panel-top">
                    <div className="blob" style={{ left: "-35%", top: "-80%" }}>
                      <BLOB2
                        className="blob-body red"
                        width={"850px"}
                        height={"810px"}
                        preserveAspectRatio="none"
                      />
                    </div>
                    <div
                      className="blob"
                      style={{ left: "-200%", top: "-290%" }}
                    >
                      <BLOB3
                        width={"500%"}
                        height={"500%"}
                        className="blob-body purple"
                      />
                    </div>
                    <div
                      className="blob"
                      style={{ left: "-140%", top: "-60%" }}
                    >
                      <BLOB1
                        className="blob-body purple"
                        width={"400%"}
                        height={"400%"}
                      />
                    </div>
                    <div className="pie" style={{ left: "0%", top: "0%" }}>
                      <PIE
                        width={"30%"}
                        height={"30%"}
                        style={{ left: "60%", top: "0%" }}
                        className="pie-body yellow"
                      />
                    </div>
                    <div className="blob" style={{ left: "30%", top: "-30%" }}>
                      <BLOB4
                        className="blob-body cyan"
                        width={"150px"}
                        height={"210px"}
                        preserveAspectRatio="none"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="people dancing"></div>
              <div className="bottom-fade"></div>

              {decors}
            </div>
            <div className="g2-inactiveLayer">{objs}</div>

            <div
              className="g2-light"
              ref={this.refLight}
              style={{
                width: this.state.game2.lightSize,
                height: this.state.game2.lightSize,
              }}
            >
              <div
                className="g2-lightScene"
                ref={this.refScene}
                style={{
                  width: this.state.desktopBounds.width,
                  height: this.state.desktopBounds.height,
                }}
              >
                {decors}
                {objs}
              </div>
            </div>
            {bonuses}
          </div>
        </div>
        <div className={"countdown display " + (time < 10 ? " warning" : "")}>
          <CircularProgress value={1 - time / this.state.game2.gameDuration}>
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
            transitionDuration: this.state.game2.stopDuration + "ms",
          }}
        ></div>
      </div>
    );
  }
}

export default Game2Page;
