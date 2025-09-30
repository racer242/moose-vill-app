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
    // {
    //   x: 370,
    //   y: 206,
    //   shape: {
    //     x: 45,
    //     y: 80,
    //     width: 87,
    //     height: 110,
    //   },
    //   targetBounds: {
    //     x: 50,
    //     y: 80,
    //     width: 66,
    //     height: 72,
    //   },
    //   src: require("../images/game2/objects/o5.png"),
    //   clip: 112,
    //   clipZone: 1,
    //   order: 1,
    //   positions: [
    //     {
    //       s: { x: 279, y: 136, r: -30.91 },
    //       f: { x: 355, y: 119, r: 3.39 },
    //     },
    //     {
    //       s: { x: 363, y: 108, r: -35.64 },
    //       f: { x: 419, y: 88, r: 0 },
    //     },
    //   ],
    // },
    // {
    //   x: 460,
    //   y: 212,
    //   shape: {
    //     x: 66,
    //     y: 83,
    //     width: 54,
    //     height: 105,
    //   },
    //   targetBounds: {
    //     x: 66,
    //     y: 83,
    //     width: 47,
    //     height: 65,
    //   },
    //   src: require("../images/game2/objects/o6.png"),
    //   clip: 125,
    //   clipZone: 1,
    //   order: 1,
    //   positions: [
    //     {
    //       s: { x: 424, y: 89, r: 0 },
    //       f: { x: 486, y: 139, r: 31.99 },
    //     },
    //     {
    //       s: { x: 490, y: 129, r: -10.81 },
    //       f: { x: 560, y: 153, r: 31.99 },
    //     },
    //   ],
    // },
    // {
    //   x: 596,
    //   y: 275,
    //   shape: {
    //     x: 58,
    //     y: 81,
    //     width: 70,
    //     height: 89,
    //   },
    //   targetBounds: {
    //     x: 69,
    //     y: 87,
    //     width: 47,
    //     height: 51,
    //   },
    //   src: require("../images/game2/objects/o7.png"),
    //   clip: 125,
    //   clipZone: 1,
    //   order: 4,
    //   positions: [
    //     {
    //       s: { x: 553, y: 225, r: -26.81 },
    //       f: { x: 597, y: 200, r: 0 },
    //     },
    //     {
    //       s: { x: 567, y: 239, r: -26.81 },
    //       f: { x: 597, y: 230, r: 0 },
    //     },
    //   ],
    // },
    // {
    //   x: 442,
    //   y: 293,
    //   shape: {
    //     x: 56,
    //     y: 65,
    //     width: 75,
    //     height: 141,
    //   },
    //   targetBounds: {
    //     x: 59,
    //     y: 72,
    //     width: 72,
    //     height: 85,
    //   },
    //   src: require("../images/game2/objects/o3.png"),
    //   clip: 110,
    //   clipZone: 1,
    //   order: 6,
    //   positions: [
    //     {
    //       s: { x: 353, y: 227, r: -9.06 },
    //       f: { x: 426, y: 171, r: 0 },
    //     },
    //     {
    //       s: { x: 470, y: 170, r: 18.84 },
    //       f: { x: 506, y: 218, r: 51.64 },
    //     },
    //   ],
    // },
    // {
    //   x: 184,
    //   y: 312,
    //   shape: {
    //     x: 42,
    //     y: 48,
    //     width: 102,
    //     height: 175,
    //   },
    //   targetBounds: {
    //     x: 59,
    //     y: 67,
    //     width: 69,
    //     height: 82,
    //   },
    //   src: require("../images/game2/objects/o4.png"),
    //   clip: 112,
    //   clipZone: 1,
    //   order: 8,
    //   positions: [
    //     {
    //       s: { x: 186, y: 175, r: 0 },
    //       f: { x: 215, y: 191, r: 6 },
    //     },
    //     {
    //       s: { x: 215, y: 191, r: 6 },
    //       f: { x: 250, y: 212, r: 29.57 },
    //     },
    //   ],
    // },

    {
      x: 588,
      y: 403,
      shape: {
        x: 48,
        y: 75,
        width: 89,
        height: 121,
      },
      targetBounds: {
        x: 56,
        y: 75,
        width: 82,
        height: 88,
      },
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
      targetBounds: {
        x: 0,
        y: 0,
        width: 186,
        height: 164,
      },
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
  lifeCount: 50,
  deadCount: 0,
  switchCount: 0,
  killCount: 1,
  killingCount: 8,

  showballThrowSize: 300,
  showballSize: 50,
  showballSpeed: 300,
  showballDistanceFactor: 1.5,
  showballShortDuration: 720,
  showballShortDurationFactor: 0.6,
  showballMinDuration: 200,

  bonusLife: 10,
  transitionDuration: 500, //ms

  stepDuration: 50, //ms
  gameDuration: 600, //ms
  stopDuration: 2000, //ms

  mobileScale: 1.2 * 0.889,
};

export default Game2Settings;
