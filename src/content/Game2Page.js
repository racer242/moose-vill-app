import React from "react";
import "../css/game2.css";
import GamePage from "./GamePage";
import CircularProgress from "../components/CircularProgress";

class Game2Page extends GamePage {
  constructor(props) {
    super(props);

    let objects = [];
    for (let i = 0; i < this.state.game2.objSources.length; i++) {
      objects.push({
        ...this.state.game2.objSources[i],
        width: this.state.game2.objectBounds.width,
        height: this.state.game2.objectBounds.height,
        backgroundSize:
          this.state.game2.objectBounds.width * 4 +
          "px " +
          this.state.game2.objectBounds.height +
          "px",
        id: "obj" + this.counter++,
        status: "obj-off",
        life: this.state.game2.deadCount,
        objectClipArea: this.state.game2.objectClipArea,
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

    this.refSnowball = React.createRef();

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
    this.showballContainer = this.refSnowball.current;

    this.showballContainer.style.left =
      (this.state.desktopBounds.width - this.state.game2.showballSize) / 2 +
      "px";
    this.showballContainer.style.top =
      (this.state.desktopBounds.height - this.state.game2.showballSize) / 2 +
      "px";
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

    let lx = x - this.state.game2.showballSize / 2;
    let ly = y - this.state.game2.showballSize / 2;

    this.showballContainer.style.left = lx + "px";
    this.showballContainer.style.top = ly + "px";

    let changed = false;
    let objects = this.state.objects;
    let bonuses = this.state.bonuses;
    let score = 0;

    // let objs = this.state.objects.filter(
    //   (v) => v.x < x && v.x + v.width > x && v.y < y && v.y + v.height > y
    // );

    // let obj = objs.length > 0 ? objs[0] : null;
    // if (obj) {
    //   if (obj.status == "obj-on" || obj.status == "obj-hide") {
    //     obj.status = "obj-killing";
    //     obj.life = this.state.game2.killingCount;
    //     changed = true;

    //     let bonusValue = 1;
    //     score = Math.max(this.state.score + bonusValue, 0);
    //     bonuses.push({
    //       id: "bonus" + this.counter++,
    //       cssX: x + this.state.game2.showballSize / 2 + "px",
    //       cssY: y - this.state.game2.showballSize / 4 + "px",
    //       value: bonusValue,
    //       status: "bonus-on",
    //     });

    //     this.setState({
    //       ...this.state,
    //       objects,
    //       bonuses,
    //       score,
    //       scoreAdded: bonusValue > 0,
    //     });
    //   }
    // }
  }

  render() {
    let objs = [];
    for (let i = 0; i < this.state.objects.length; i++) {
      let obj = this.state.objects[i];
      objs.push(
        <div
          className={
            "g2-gameObjectBox "
            // +
            // "g2-" +
            // obj.status +
            // (this.state.finished ? " g2-obj-stop" : "")
          }
          id={obj.id}
          key={obj.id}
          style={{
            left: obj.x - obj.objectClipArea * obj.clipZone,
            top: obj.y - obj.objectClipArea * obj.clipZone,
            width: obj.width + obj.objectClipArea * 2 * obj.clipZone,
            height: obj.objectClipArea * obj.clipZone + obj.clip,
            transitionDuration: this.state.game2.transitionDuration + "ms",
            transitionDelay:
              Math.random() * this.state.game2.transitionDuration + "ms",
            zIndex: obj.order,
          }}
          onClick={this.objButton_clickHandler}
        >
          <div
            className={"g2-gameObject"}
            style={{
              left: obj.objectClipArea * obj.clipZone,
              top: obj.objectClipArea * obj.clipZone,
              width: obj.width,
              height: obj.height,
              backgroundImage: `url(${obj.src})`,
              backgroundSize: obj.backgroundSize,
            }}
          ></div>
        </div>
      );
    }

    let things = [];
    for (let i = 0; i < this.state.game2.thingSources.length; i++) {
      let thing = this.state.game2.thingSources[i];
      things.push(
        <div
          className={"g2-thing"}
          id={"th" + i}
          key={"th" + i}
          style={{
            left: thing.x,
            top: thing.y,
            width: thing.width,
            height: thing.height,
            backgroundImage: `url(${thing.src})`,
            zIndex: thing.order,
          }}
          onClick={this.objButton_clickHandler}
        ></div>
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
              width: this.state.game2.sceneBounds.width,
              height: this.state.game2.sceneBounds.height,
            }}
            onPointerDown={this.scene_moveHandler}
            onPointerMove={this.scene_moveHandler}
          >
            <div className="g2-inactiveLayer">
              {things}
              {objs}
            </div>

            <div
              className="g2-snowball"
              ref={this.refSnowball}
              style={{
                width: this.state.game2.showballSize,
                height: this.state.game2.showballSize,
              }}
            ></div>
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
