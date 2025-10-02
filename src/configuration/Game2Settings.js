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
      x: 370,
      y: 206,
      shape: {
        x: 45,
        y: 80,
        width: 87,
        height: 110,
      },
      targetBounds: [
        {
          x: 50,
          y: 80,
          width: 29,
          height: 29,
        },
        {
          x: 94,
          y: 90,
          width: 40,
          height: 24,
        },
        {
          x: 55,
          y: 106,
          width: 60,
          height: 25,
        },
        {
          x: 51,
          y: 130,
          width: 50,
          height: 27,
        },
      ],
      src: require("../images/game2/objects/o5.png"),
      clip: 112,
      clipZone: 1,
      order: 1,
      positions: [
        {
          s: { x: 279, y: 136, r: -30.91 },
          f: { x: 355, y: 119, r: 3.39 },
        },
        {
          s: { x: 363, y: 108, r: -35.64 },
          f: { x: 419, y: 88, r: 0 },
        },
      ],
    },
    {
      x: 460,
      y: 212,
      shape: {
        x: 66,
        y: 83,
        width: 54,
        height: 105,
      },
      targetBounds: [
        {
          x: 66,
          y: 83,
          width: 15,
          height: 17,
        },
        {
          x: 99,
          y: 88,
          width: 15,
          height: 17,
        },
        {
          x: 72,
          y: 98,
          width: 38,
          height: 50,
        },
      ],
      src: require("../images/game2/objects/o6.png"),
      clip: 125,
      clipZone: 1,
      order: 1,
      positions: [
        {
          s: { x: 424, y: 89, r: 0 },
          f: { x: 486, y: 139, r: 31.99 },
        },
        {
          s: { x: 490, y: 129, r: -10.81 },
          f: { x: 560, y: 153, r: 31.99 },
        },
      ],
    },
    {
      x: 596,
      y: 275,
      shape: {
        x: 58,
        y: 81,
        width: 70,
        height: 89,
      },
      targetBounds: [
        {
          x: 59,
          y: 93,
          width: 21,
          height: 18,
        },
        {
          x: 107,
          y: 93,
          width: 21,
          height: 18,
        },
        {
          x: 78,
          y: 103,
          width: 35,
          height: 45,
        },
      ],
      src: require("../images/game2/objects/o7.png"),
      clip: 125,
      clipZone: 1,
      order: 4,
      positions: [
        {
          s: { x: 554, y: 214, r: -26.81 },
          f: { x: 597, y: 200, r: 0 },
        },
      ],
    },
    {
      x: 442,
      y: 293,
      shape: {
        x: 56,
        y: 65,
        width: 75,
        height: 141,
      },
      targetBounds: [
        {
          x: 58,
          y: 75,
          width: 28,
          height: 27,
        },
        {
          x: 96,
          y: 66,
          width: 22,
          height: 34,
        },
        {
          x: 70,
          y: 99,
          width: 56,
          height: 60,
        },
      ],
      src: require("../images/game2/objects/o3.png"),
      clip: 110,
      clipZone: 1,
      order: 6,
      positions: [
        {
          s: { x: 353, y: 227, r: -9.06 },
          f: { x: 426, y: 171, r: 0 },
        },
        {
          s: { x: 470, y: 170, r: 18.84 },
          f: { x: 506, y: 218, r: 51.64 },
        },
      ],
    },
    {
      x: 184,
      y: 312,
      shape: {
        x: 42,
        y: 48,
        width: 102,
        height: 175,
      },
      targetBounds: [
        {
          x: 45,
          y: 48,
          width: 25,
          height: 39,
        },
        {
          x: 118,
          y: 52,
          width: 23,
          height: 37,
        },
        {
          x: 70,
          y: 67,
          width: 46,
          height: 91,
        },
        {
          x: 45,
          y: 114,
          width: 91,
          height: 37,
        },
      ],
      src: require("../images/game2/objects/o4.png"),
      clip: 112,
      clipZone: 1,
      order: 8,
      positions: [
        {
          s: { x: 186, y: 175, r: 0 },
          f: { x: 215, y: 191, r: 6 },
        },
        {
          s: { x: 215, y: 191, r: 6 },
          f: { x: 250, y: 212, r: 29.57 },
        },
      ],
    },

    {
      x: 588,
      y: 403,
      shape: {
        x: 48,
        y: 75,
        width: 89,
        height: 121,
      },
      targetBounds: [
        {
          x: 49,
          y: 88,
          width: 34,
          height: 38,
        },
        {
          x: 112,
          y: 75,
          width: 26,
          height: 38,
        },
        {
          x: 76,
          y: 103,
          width: 56,
          height: 60,
        },
      ],
      src: require("../images/game2/objects/o2.png"),
      clip: 137,
      clipZone: 1,
      order: 10,
      positions: [
        {
          s: { x: 500, y: 323, r: -27.54 },
          f: { x: 551, y: 282, r: 0 },
        },
        {
          s: { x: 551, y: 282, r: 0 },
          f: { x: 595, y: 285, r: 12.99 },
        },
      ],
    },

    {
      x: 326,
      y: 535,
      shape: {
        x: 2,
        y: 5,
        width: 181,
        height: 261,
      },
      targetBounds: [
        {
          x: 7,
          y: 13,
          width: 65,
          height: 51,
        },
        {
          x: 115,
          y: 18,
          width: 65,
          height: 51,
        },
        {
          x: 44,
          y: 64,
          width: 95,
          height: 107,
        },
      ],
      src: require("../images/game2/objects/o1.png"),
      clip: 167,
      clipZone: 2.5,
      order: 12,
      positions: [
        {
          s: { x: 220, y: 424, r: -15.15 },
          f: { x: 285, y: 329, r: -6 },
        },
        {
          s: { x: 354, y: 320, r: 8.28 },
          f: { x: 467, y: 421, r: 38.46 },
        },
      ],
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

  bonusBounds: {
    width: 100,
    height: 100,
  },

  lifeCount: 25,
  deadCount: 0,
  switchCount: 0,
  killCount: 0,
  killingCount: 10,

  showballThrowSize: 300,
  showballSize: 50,
  showballDistanceFactor: 2.2,
  showballShortDistance: 450,
  showballShortDurationFactor: 1.8,
  showballMinDuration: 250,
  showballExplodeDuration: 800,
  showburstDistanceFactor: 1.7,
  showburstDuration: 500,
  snowParticlesCount: 30,

  bonusLife: 20,
  transitionDuration: 500, //ms

  stepDuration: 50, //ms
  gameDuration: 60, //ms
  stopDuration: 2000, //ms

  mobileScale: 1.2 * 0.889,
};

export default Game2Settings;
