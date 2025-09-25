import { isMobile, isLocal } from "../core/helpers";

const Game2Settings = {
  sceneBounds: {
    width: 960,
    height: 806,
  },
  objectBounds: {
    width: 186,
    height: 271,
  },
  objectClipArea: 100,
  objSources: [
    {
      x: 349,
      y: 206,
      src: require("../images/game2/objects/o5.png"),
      clip: 112,
      clipZone: 1,
      order: 1,
    },
    {
      x: 487,
      y: 212,
      src: require("../images/game2/objects/o6.png"),
      clip: 125,
      clipZone: 1,
      order: 1,
    },
    {
      x: 596,
      y: 275,
      src: require("../images/game2/objects/o7.png"),
      clip: 125,
      clipZone: 1,
      order: 4,
    },
    {
      x: 442,
      y: 293,
      src: require("../images/game2/objects/o3.png"),
      clip: 110,
      clipZone: 1,
      order: 6,
    },
    {
      x: 184,
      y: 312,
      src: require("../images/game2/objects/o4.png"),
      clip: 112,
      clipZone: 1,
      order: 8,
    },
    {
      x: 588,
      y: 403,
      src: require("../images/game2/objects/o2.png"),
      clip: 137,
      clipZone: 1,
      order: 10,
    },
    {
      x: 326,
      y: 535,
      src: require("../images/game2/objects/o1.png"),
      clip: 167,
      clipZone: 2,
      order: 12,
    },
  ],
  thingSources: [
    {
      x: 342,
      y: 238,
      width: 317,
      height: 117,
      src: require("../images/game2/objects/t5.png"),
      order: 2,
    },
    {
      x: 573,
      y: 359,
      width: 174,
      height: 64,
      src: require("../images/game2/objects/t6.png"),
      order: 5,
    },
    {
      x: 357,
      y: 313,
      width: 259,
      height: 176,
      src: require("../images/game2/objects/t3.png"),
      order: 7,
    },
    {
      x: 207,
      y: 348,
      width: 139,
      height: 108,
      src: require("../images/game2/objects/t4.png"),
      order: 9,
    },

    {
      x: 505,
      y: 456,
      width: 250,
      height: 126,
      src: require("../images/game2/objects/t2.png"),
      order: 11,
    },
    {
      x: 173,
      y: 483,
      width: 381,
      height: 274,
      src: require("../images/game2/objects/t1.png"),
      order: 13,
    },
  ],
  lifeCount: 7,
  deadCount: 1,
  killCount: 1,
  killingCount: 8,
  switchCount: 1,

  showballSize: 50,

  bonusLife: 10,
  transitionDuration: 100, //ms

  stepDuration: 50, //ms
  gameDuration: 600, //s
  stopDuration: 2000, //ms

  mobileScale: 1.2 * 0.889,
};

export default Game2Settings;
