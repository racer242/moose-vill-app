import { isMobile, isLocal } from "../core/helpers";

const Game3Settings = {
  cellBounds: {
    width: 84,
    height: 94,
    gapX: 10,
    gapY: 10,
  },
  bonusBounds: {
    width: 100,
    height: 100,
  },

  objSources1: [
    {
      type: {
        src: require("../images/game3/objects/o1.png"),
        bonus: 1,
      },
    },
    {
      type: {
        src: require("../images/game3/objects/o2.png"),
        bonus: 1,
      },
    },
    {
      type: {
        src: require("../images/game3/objects/o3.png"),
        bonus: 1,
      },
    },
    {
      type: {
        src: require("../images/game3/objects/o4.png"),
        bonus: 1,
      },
    },
    {
      type: {
        src: require("../images/game3/objects/o5.png"),
        bonus: 1,
      },
    },
    {
      type: {
        src: require("../images/game3/objects/o6.png"),
        bonus: 1,
      },
    },
    {
      type: {
        src: require("../images/game3/objects/o7.png"),
        bonus: 1,
      },
    },
    {
      type: {
        src: require("../images/game3/objects/o8.png"),
        bonus: 1,
      },
    },
    {
      type: {
        src: require("../images/game3/objects/o9.png"),
        bonus: 1,
      },
    },
    {
      type: {
        src: require("../images/game3/objects/o10.png"),
        bonus: 1,
      },
    },
  ],

  objSources2: [
    {
      type: {
        src: require("../images/game3/objects/o11.png"),
        bonus: 1,
      },
    },
    {
      type: {
        src: require("../images/game3/objects/o12.png"),
        bonus: 1,
      },
    },
    {
      type: {
        src: require("../images/game3/objects/o13.png"),
        bonus: 1,
      },
    },
    {
      type: {
        src: require("../images/game3/objects/o14.png"),
        bonus: 1,
      },
    },
    {
      type: {
        src: require("../images/game3/objects/o15.png"),
        bonus: 1,
      },
    },
    {
      type: {
        src: require("../images/game3/objects/o16.png"),
        bonus: 1,
      },
    },
    {
      type: {
        src: require("../images/game3/objects/o17.png"),
        bonus: 1,
      },
    },
    {
      type: {
        src: require("../images/game3/objects/o18.png"),
        bonus: 1,
      },
    },
    {
      type: {
        src: require("../images/game3/objects/o19.png"),
        bonus: 1,
      },
    },
    {
      type: {
        src: require("../images/game3/objects/o20.png"),
        bonus: 1,
      },
    },
  ],

  objects2Ratio: 0.3,

  cellColors: ["#5D279E", "#A71FE1", "#FF49B8", "#E11F26"],

  modeSequense: ["rows", "columns", "diagonal"],
  modeCount: 40,

  matrixSize: [4, 4],

  lifeCount: 3,
  deadCount: 4,
  killingCount: 1,
  killCount: 3,
  lightSize: 100,

  bonusLife: 3,

  newCount: 2,
  transitionDuration: 200, //ms
  detectionSize: 50,

  stepDuration: 500, //ms
  gameDuration: 60, //s
  stopDuration: 2000, //ms
  animationDuration: 4000, //ms
};

export default Game3Settings;
