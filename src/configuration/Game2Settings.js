import { isMobile, isLocal } from "../core/helpers";

const Game2Settings = {
  objectBounds: {
    width: 100,
    height: 100,
  },
  bonusBounds: {
    width: 100,
    height: 100,
  },
  objSources: [
    {
      x: 282,
      y: 229,
      width: 47,
      height: 72,
      type: {
        src: require("../images/game2/objects/o1.png"),
        bonus: 1,
        speed: 0.5,
      },
    },
    {
      x: 451,
      y: 365,
      width: 63,
      height: 80,
      type: {
        src: require("../images/game2/objects/o2.png"),
        bonus: 1,
        speed: 0.5,
      },
    },
    {
      x: 453,
      y: 159,
      width: 69,
      height: 108,
      type: {
        src: require("../images/game2/objects/o3.png"),
        bonus: 1,
        speed: 0.5,
      },
    },
    {
      x: 369,
      y: 57,
      width: 48,
      height: 62,
      type: {
        src: require("../images/game2/objects/o4.png"),
        bonus: 1,
        speed: 0.5,
      },
    },
    {
      x: 596,
      y: 200,
      width: 63,
      height: 95,
      type: {
        src: require("../images/game2/objects/o5.png"),
        bonus: 1,
        speed: 0.5,
      },
    },
    {
      x: 384,
      y: 294,
      width: 56,
      height: 56,
      type: {
        src: require("../images/game2/objects/o6.png"),
        bonus: 1,
        speed: 0.5,
      },
    },
    {
      x: 567,
      y: 393,
      width: 64,
      height: 53,
      type: {
        src: require("../images/game2/objects/o7.png"),
        bonus: 1,
        speed: 0.5,
      },
    },
    {
      x: 288,
      y: 368,
      width: 76,
      height: 76,
      type: {
        src: require("../images/game2/objects/o8.png"),
        bonus: 1,
        speed: 0.5,
      },
    },
    {
      x: 640,
      y: 347,
      width: 27,
      height: 87,
      type: {
        src: require("../images/game2/objects/o9.png"),
        bonus: 1,
        speed: 0.5,
      },
    },
    {
      x: 544,
      y: 90,
      width: 37,
      height: 84,
      type: {
        src: require("../images/game2/objects/o10.png"),
        bonus: 1,
        speed: 0.5,
      },
    },
  ],
  decorSources: [
    {
      x: 380,
      y: 368,
      width: 81,
      height: 71,
      type: {
        src: require("../images/game2/drummer.png"),
      },
    },
    {
      x: 531,
      y: 370,
      width: 48,
      height: 60,
      type: {
        src: require("../images/game2/guitarist.png"),
      },
    },
  ],
  lifeCount: 7,
  deadCount: 1,
  killCount: 1,
  killingCount: 8,
  switchCount: 1,

  lightSize: 100,

  bonusLife: 10,
  transitionDuration: 100, //ms

  stepDuration: 50, //ms
  gameDuration: 60, //s
  stopDuration: 2000, //ms

  mobileScale: 1.2,
};

export default Game2Settings;
