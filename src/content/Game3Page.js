import React from "react";
import "../css/game3.css";
import GamePage from "./GamePage";
import CircularProgress from "../components/CircularProgress";

class Game3Page extends GamePage {
  constructor(props) {
    super(props);

    let cells = [];
    let randomCell = [];
    for (let i = 0; i < this.state.game3.matrixSize[0]; i++) {
      for (let j = 0; j < this.state.game3.matrixSize[1]; j++) {
        let cell = {
          id: "cell_" + i + "_" + j,
          row: i,
          column: j,
          x:
            j *
            (this.state.game3.cellBounds.width +
              this.state.game3.cellBounds.gapX),
          y:
            i *
            (this.state.game3.cellBounds.height +
              this.state.game3.cellBounds.gapY),
          width: this.state.game3.cellBounds.width,
          height: this.state.game3.cellBounds.height,
          color: this.state.game3.cellColors[i],
        };
        cells.push(cell);
        randomCell.push(cell);
      }
    }

    randomCell.sort((a, b) => 0.5 - Math.random());

    let amount =
      (this.state.game3.matrixSize[0] * this.state.game3.matrixSize[1]) / 2;
    let amount2 = Math.round(amount * this.state.game3.objects2Ratio);
    let amount1 = amount - amount2;

    let sources = [...this.state.game3.objSources1]
      .sort((a, b) => 0.5 - Math.random())
      .slice(0, amount1)
      .concat(
        [...this.state.game3.objSources2]
          .sort((a, b) => 0.5 - Math.random())
          .slice(0, amount2)
      );

    let objects = [];
    for (let i = 0; i < amount; i++) {
      let cell = randomCell.pop();
      let obj = {
        ...sources[i],
        id: "obj" + this.counter++,
        status: "obj-off",
        isOpen: false,
        isFound: false,
      };
      cell.obj = obj;
      objects.push(obj);

      let firstObj = obj;

      cell = randomCell.pop();
      obj = {
        ...sources[i],
        id: "obj" + this.counter++,
        status: "obj-off",
        isOpen: false,
        isFound: false,
      };
      cell.obj = obj;
      objects.push(obj);

      let secondObj = obj;

      firstObj.pair = secondObj;
      secondObj.pair = firstObj;
    }

    this.state = {
      ...this.state,
      gameDuration: this.state.game3.gameDuration,
      stopDuration: this.state.game3.stopDuration,
      stepDuration: this.state.game3.stepDuration,
      objects,
      cells,
      cellsWidth:
        this.state.game3.matrixSize[0] *
          (this.state.game3.cellBounds.width +
            this.state.game3.cellBounds.gapX) -
        this.state.game3.cellBounds.gapX,
      cellsHeight:
        this.state.game3.matrixSize[1] *
          (this.state.game3.cellBounds.height +
            this.state.game3.cellBounds.gapY) -
        this.state.game3.cellBounds.gapY,
      bonuses: [],
      activityEnabled: true,
      aniMode: "rows",
      modeLife: 0,
      currentMode: 0,
    };

    this.cell_clickHandler = this.cell_clickHandler.bind(this);
  }

  doGame() {
    let objects = this.state.objects;
    let bonuses = this.state.bonuses;
    let scoreAdded = this.state.scoreAdded;

    let count = objects.filter((v) => v.isFound);
    if (count.length === objects.length) {
      this.stopGame();
      this.finishGame();
      return false;
    }

    let findOpened = objects.filter((v) => v.isOpen && !v.isFound);
    let activityEnabled = findOpened.length <= 1;

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

    for (const obj of objects) {
      if (obj.status == "obj-show") {
        obj.status = "obj-on";
        continue;
      }

      if (obj.status == "obj-hide") {
        obj.status = "obj-off";
        continue;
      }

      if (obj.status == "obj-hidding") {
        obj.status = "obj-hide";
        continue;
      }

      if (obj.status == "obj-wait-and-found") {
        continue;
      }
      if (obj.status == "obj-show-and-found") {
        obj.status = "obj-show";
        continue;
      }
      if (obj.status == "obj-wait-and-hide") {
        obj.status = "obj-hidding";
        obj.isOpen = false;
        continue;
      }
      if (obj.status == "obj-show-and-hide") {
        obj.status = "obj-hidding";
        obj.isOpen = false;
        continue;
      }

      if (obj.status == "obj-off") {
        continue;
      }

      if (obj.status == "obj-on") {
        continue;
      }
    }

    let aniMode = this.state.aniMode;
    let currentMode = this.state.currentMode;
    let modeLife = this.state.modeLife;
    if (modeLife > this.state.game3.modeCount) {
      modeLife = 0;
      currentMode++;
      if (currentMode >= this.state.game3.modeSequense.length) {
        currentMode = 0;
      }
      aniMode = this.state.game3.modeSequense[currentMode];
    }
    modeLife++;

    let score = this.state.game3.gameDuration - this.state.countdown;

    this.setState({
      ...this.state,
      objects,
      bonuses,
      activityEnabled,
      aniMode,
      currentMode,
      modeLife,
      scoreAdded,
      score,
    });
    return true;
  }

  cell_clickHandler(event) {
    let cells = this.state.cells;
    let objects = this.state.objects;
    let bonuses = this.state.bonuses;
    let bonusValue = 0;
    let cellsFound = cells.filter((v) => v.id == event.target.id);
    if (cellsFound.length > 0) {
      let obj = cellsFound[0].obj;
      if (!obj.isOpen) {
        let findOpened = objects.filter((v) => v.isOpen && !v.isFound);
        if (findOpened.length <= 1) {
          if (findOpened.length > 0) {
            let foundObj = findOpened[0];
            if (foundObj.pair === obj) {
              foundObj.isFound = true;
              foundObj.status = "obj-wait-and-found";
              obj.isFound = true;
              obj.status = "obj-show-and-found";
              obj.isOpen = true;
              bonusValue = obj.type.bonus;
              bonuses.push({
                id: "bonus" + this.counter++,
                cssX:
                  event.target.offsetLeft +
                  this.state.game3.cellBounds.width / 2,
                cssY:
                  event.target.offsetTop +
                  this.state.game3.cellBounds.height / 2,
                value: bonusValue,
                status: "bonus-on",
              });
            } else {
              foundObj.status = "obj-wait-and-hide";
              obj.status = "obj-show-and-hide";
              obj.isOpen = true;
            }
          } else {
            obj.status = "obj-show";
            obj.isOpen = true;
          }
        }
      }
    }
    let score = this.state.game3.gameDuration - this.state.countdown;

    this.setState({
      ...this.state,
      objects,
      bonuses,
      score,
      scoreAdded: bonusValue > 0,
    });
  }

  render() {
    let objs = [];
    let cells = [];
    for (let i = 0; i < this.state.cells.length; i++) {
      let cell = this.state.cells[i];
      let obj = cell.obj;
      cells.push(
        <div
          className={
            "g3-cellBox" + (this.state.finished ? " g3-cell-stop" : "")
          }
          id={cell.id}
          key={cell.id}
          style={{
            left: cell.x,
            top: cell.y,
            width: cell.width,
            height: cell.height,
            transitionDuration: this.state.game3.transitionDuration + "ms",
            pointerEvents: obj.isFound ? "none" : "",
          }}
          onPointerDown={this.cell_clickHandler}
        >
          <div
            className="g3-cellPlate"
            style={{
              backgroundColor: obj.isFound ? "#D0D5E0" : cell.color,
              transitionDuration: this.state.game3.transitionDuration + "ms",
              animationDelay:
                this.state.aniMode == "rows"
                  ? (this.state.game3.animationDuration / 4) * cell.row + "ms"
                  : this.state.aniMode == "columns"
                  ? (this.state.game3.animationDuration / 4) * cell.column +
                    "ms"
                  : (this.state.game3.animationDuration / 4) *
                      (cell.column + cell.row) +
                    "ms",
              animationName: obj.isFound ? "" : "color-switch",
              animationDuration: this.state.game3.animationDuration + "ms",
              animationIterationCount: "infinite",
            }}
          >
            <div
              className={
                "g3-gameObjectBox " +
                "g3-" +
                obj.status +
                (this.state.finished ? " g3-obj-stop" : "")
              }
              id={obj.id}
              key={obj.id}
              style={{
                transitionDuration: this.state.game3.transitionDuration + "ms",
              }}
            >
              <div
                className={"g3-gameObject"}
                style={{
                  backgroundImage: `url(${obj.type.src})`,
                  pointerEvents: "none",
                }}
              ></div>
            </div>
          </div>
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
            {!this.props.bounds.mobileSize && (
              <>
                <div className="disc-left music-box"></div>
                <div className="disc-right music-box"></div>
                <div className="music-button-box">
                  <div className="music-button button-switching"></div>
                  <div className="music-button button-switching delay500ms"></div>
                  <div className="music-button button-switching delay1s"></div>
                </div>
                <div className="jack-box">
                  <div className="jack button-switching"></div>
                  <div className="jack button-switching delay500ms"></div>
                  <div className="jack button-switching delay1s"></div>
                </div>
                <div className="ajuster-right ajusting"></div>
                <div className="ajuster-left ajusting delay3s"></div>
                <div className="handle-box">
                  <div className="handle">
                    <div className="handle handling"></div>
                    <div className="handle-item"></div>
                  </div>
                  <div className="handle">
                    <div className="handle handling delay500ms"></div>
                    <div className="handle-item"></div>
                  </div>
                  <div className="handle">
                    <div className="handle handling delay500ms"></div>
                    <div className="handle-item"></div>
                  </div>
                  <div className="handle">
                    <div className="handle handling"></div>
                    <div className="handle-item"></div>
                  </div>
                  <div className="handle">
                    <div className="handle handling delay500ms"></div>
                    <div className="handle-item"></div>
                  </div>
                  <div className="handle">
                    <div className="handle handling delay500ms"></div>
                    <div className="handle-item"></div>
                  </div>
                </div>
              </>
            )}
            {this.props.bounds.mobileSize && (
              <>
                <div className="disc-mobile music-box"></div>
                <div className="jack-box">
                  <div className="jack button-switching"></div>
                  <div className="jack button-switching delay500ms"></div>
                  <div className="jack button-switching delay1s"></div>
                </div>
                <div className="music-button-box">
                  <div className="music-button button-switching"></div>
                  <div className="music-button button-switching delay1s"></div>
                </div>
                <div className="ajuster-rotate">
                  <div className="ajuster-mobile ajusting"></div>
                </div>
                <div className="handle-box">
                  <div className="handle">
                    <div className="handle handling"></div>
                    <div className="handle-item"></div>
                  </div>
                  <div className="handle">
                    <div className="handle handling delay500ms"></div>
                    <div className="handle-item"></div>
                  </div>
                  <div className="handle">
                    <div className="handle handling delay500ms"></div>
                    <div className="handle-item"></div>
                  </div>
                </div>
              </>
            )}
            <div
              className="g3-gameCellsBlock"
              style={{
                width: this.state.cellsWidth,
                height: this.state.cellsHeight,
              }}
            >
              {cells}
              {bonuses}
            </div>
          </div>
        </div>
        <div className={"countdown display " + (time < 10 ? " warning" : "")}>
          <CircularProgress value={1 - time / this.state.game3.gameDuration}>
            {time}
          </CircularProgress>
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
