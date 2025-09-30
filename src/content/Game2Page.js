import React from "react";
import "../css/game2.css";
import GamePage from "./GamePage";
import CircularProgress from "../components/CircularProgress";

class Game2Page extends GamePage {
  constructor(props) {
    super(props);

    let objects = [];
    for (let i = 0; i < this.state.game2.objSources.length; i++) {
      let obj = this.state.game2.objSources[i];
      objects.push({
        ...obj,
        width: this.state.game2.objectBounds.width,
        height: this.state.game2.objectBounds.height,
        backgroundSize:
          this.state.game2.objectBounds.width * 4 +
          "px " +
          this.state.game2.objectBounds.height +
          "px",
        id: "obj" + this.counter++,
        status: "obj-off",
        over: false,
        target: false,
        life: this.state.game2.deadCount,
        objectClipArea: this.state.game2.objectClipArea,
        positions: obj.positions.map((v, i) => {
          return {
            s: { x: v.s.x - obj.x, y: v.s.y - obj.y, r: v.s.r },
            f: { x: v.f.x - obj.x, y: v.f.y - obj.y, r: v.f.r },
          };
        }),
        position: { x: 0, y: 0, r: 0 },
        startPosition: { x: 0, y: 0, r: 0 },
        target: null,
      });
    }

    this.gameState = {
      gameDuration: this.state.game2.gameDuration,
      stopDuration: this.state.game2.stopDuration,
      stepDuration: this.state.game2.stepDuration,
      objects,
      bonuses: [],
    };

    this.gameState.currentObject = this.getNextObject();

    this.state = { ...this.state, ...this.gameState };

    this.refSnowball = React.createRef();

    this.scene_moveHandler = this.scene_moveHandler.bind(this);
    this.object_downHandler = this.object_downHandler.bind(this);
    this.scene_downHandler = this.scene_downHandler.bind(this);
  }

  updateState() {
    this.setState({ ...this.state, ...this.gameState });
  }

  setGameState(gameState) {
    this.gameState = { ...this.gameState, ...gameState };
    this.updateState();
  }

  getNextObject() {
    let objects = this.gameState.objects;
    let currentObject = this.gameState.currentObject;
    let nextObject;
    do {
      nextObject = objects[Math.floor(Math.random() * objects.length)];
    } while (currentObject === nextObject);
    return nextObject;
  }

  getPosition(positions) {
    let position = positions[Math.floor(positions.length * Math.random())];
    let rnd = Math.random();
    let x = position.s.x + rnd * (position.f.x - position.s.x);
    let y = position.s.y + rnd * (position.f.y - position.s.y);
    let r = position.s.r + rnd * (position.f.r - position.s.r);
    return { x, y, r };
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
    let objects = this.gameState.objects;
    let bonuses = this.gameState.bonuses;
    let obj = this.gameState.currentObject;
    let scoreAdded = this.gameState.scoreAdded;

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
          Math.round(Math.random() * this.state.game2.lifeCount) +
          this.state.game2.lifeCount;
      }
    } else if (obj.status == "obj-hide") {
      obj.life--;
      if (obj.life < 0) {
        obj.status = "obj-off";
        obj.life =
          Math.round(Math.random() * this.state.game2.deadCount) +
          this.state.game2.deadCount;
        obj = this.getNextObject();
      }
    } else if (obj.status == "obj-off") {
      obj.life--;
      if (obj.life < 0) {
        obj.status = "obj-show";
        obj.life = this.state.game2.switchCount;
        obj.position = this.getPosition(obj.positions);
      }
    } else if (obj.status == "obj-on") {
      obj.life--;
      if (obj.life < 0) {
        obj.status = "obj-hide";
        obj.life = this.state.game2.switchCount;
        obj.position = obj.startPosition;
        obj.target = false;
      }
    } else if (obj.status == "obj-kill") {
      obj.life--;
      if (obj.life < 0) {
        obj.status = "obj-off";
        obj.life =
          Math.round(Math.random() * this.state.game2.deadCount) +
          this.state.game2.deadCount;
      }
      obj = this.getNextObject();
    } else if (obj.status == "obj-killing") {
      obj.life--;
      if (obj.life < 0) {
        obj.status = "obj-kill";
        obj.life =
          Math.round(Math.random() * this.state.game2.killCount) +
          this.state.game2.killCount;
      }
    }

    this.setGameState({
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

    // let objects = this.state.objects;
    // let objs = this.state.objects.map((v) => {
    //   v.over = false;
    //   return v;
    // });

    // objs = objs.filter(
    //   (v) => v.x < x && v.x + v.width > x && v.y < y && v.y + v.height > y
    // );

    // let obj = objs.length > 0 ? objs[0] : null;
    // if (obj) {
    //   if (obj.status == "obj-on" || obj.status == "obj-hide") {
    //     obj.over = true;

    //     this.setState({
    //       ...this.state,
    //       objects,
    //     });
    //   }
    // }

    // let changed = false;
    // let objects = this.state.objects;
    // let bonuses = this.state.bonuses;
    // let score = 0;
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

  scene_downHandler(event) {
    if (this.state.finished) return;
    if (this.gameState.target) return;

    let b = event.currentTarget.getBoundingClientRect();
    let x = (event.clientX - b.x) / this.props.bounds.pageScale;
    let y = (event.clientY - b.y) / this.props.bounds.pageScale;

    if (this.props.bounds.mobileSize) {
      x /= this.state.game2.mobileScale;
      y /= this.state.game2.mobileScale;
    }

    x = x - this.state.game2.showballThrowSize / 2;
    y = y - this.state.game2.showballThrowSize / 2;

    let target = {
      ...this.gameState.target,
      x,
      y,
      gx: event.clientX,
      gy: event.clientY,
    };

    let showballFlightDuration =
      this.state.game2.showballSpeed +
      (this.state.desktopBounds.height - y) *
        this.state.game2.showballDistanceFactor;

    let targetIsNearby =
      showballFlightDuration < this.state.game2.showballShortDuration;

    if (targetIsNearby) {
      showballFlightDuration =
        showballFlightDuration * this.state.game2.showballShortDurationFactor;
    }

    if (showballFlightDuration < this.state.game2.showballMinDuration) {
      showballFlightDuration = this.state.game2.showballMinDuration;
    }

    this.setGameState({
      target,
      showballFlightDuration,
      targetIsNearby,
    });

    this.snowballTimer = setTimeout(() => {
      let target = this.gameState.target;

      let objs = this.gameState.objects.filter(
        (v) =>
          v.x + v.targetBounds.x < target.x &&
          v.x + v.targetBounds.x + v.targetBounds.width > target.x &&
          v.y + v.targetBounds.y < target.y &&
          v.y + v.targetBounds.y + v.targetBounds.height > target.y
      );

      let elements = document.elementsFromPoint(target.gx, target.gy);
      if (elements) {
        elements = elements.filter((v) => v.id.indexOf("target-area") === 0);
        console.log("target", elements);
      }

      target = null;
      this.setGameState({
        target,
      });
    }, showballFlightDuration);
  }

  object_downHandler(event) {
    if (this.gameState.finished) return;
    if (this.gameState.target) return;
    let b = event.currentTarget.getBoundingClientRect();
    let x = (event.clientX - b.x) / this.props.bounds.pageScale;
    let y = (event.clientY - b.y) / this.props.bounds.pageScale;

    x = x - this.state.game2.showballThrowSize / 2;
    y = y - this.state.game2.showballThrowSize / 2;

    let objects = this.gameState.objects;
    let objs = objects.filter((v) => v.id === event.target.id);
    let obj = objs.length > 0 ? objs[0] : null;
    if (obj) {
      if (obj.status == "obj-on" || obj.status == "obj-hide") {
        obj.target = true;
      }
      this.setGameState({
        objects,
      });
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
            left: obj.x - obj.objectClipArea * obj.clipZone,
            top: obj.y - obj.objectClipArea * obj.clipZone,
            width: obj.width + obj.objectClipArea * 2 * obj.clipZone,
            height: obj.objectClipArea * obj.clipZone + obj.clip,
            zIndex: obj.order,
          }}
          onClick={this.objButton_clickHandler}
        >
          <div
            className={
              "g2-gameObject" +
              " g2-" +
              (obj.target ? "wide-" : "") +
              "is-blinking" +
              (obj.over ? " g2-is-over" : "")
            }
            style={{
              left: obj.objectClipArea * obj.clipZone,
              top: obj.objectClipArea * obj.clipZone,
              transform:
                "translate(" +
                obj.position.x +
                "px," +
                obj.position.y +
                "px) rotate(" +
                obj.position.r +
                "deg)",
              width: obj.width,
              height: obj.height,
              backgroundImage: `url(${obj.src})`,
              backgroundSize: obj.backgroundSize,
              transitionDuration: this.state.game2.transitionDuration + "ms",
            }}
          >
            <div
              id={"target-area-" + obj.id}
              className="g2-gameObject-area"
              style={{
                left: obj.targetBounds.x,
                top: obj.targetBounds.y,
                width: obj.targetBounds.width,
                height: obj.targetBounds.height,
              }}
            ></div>
            <div
              id={obj.id}
              className="g2-gameObject-shape"
              style={{
                left: obj.shape.x,
                top: obj.shape.y,
                width: obj.shape.width,
                height: obj.shape.height,
              }}
              onPointerDown={this.object_downHandler}
            ></div>
          </div>
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
            onPointerDown={this.scene_downHandler}
            onPointerMove={this.scene_moveHandler}
          >
            <div className="g2-inactiveLayer">
              {things}
              {objs}
            </div>

            {this.state.target && (
              <div
                className="g2-snowball-attack"
                style={{
                  left: this.state.target.x,
                  top: this.state.target.y,
                  width: this.state.game2.showballThrowSize,
                  height: this.state.game2.showballThrowSize,
                  animationDuration: this.state.showballFlightDuration + "ms",
                  animationName: this.state.targetIsNearby
                    ? "throwSnowballNearby"
                    : "throwSnowball",
                }}
              ></div>
            )}
            <div
              className="g2-snowball"
              ref={this.refSnowball}
              style={{
                visibility: this.state.target ? "hidden" : "visible",
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
