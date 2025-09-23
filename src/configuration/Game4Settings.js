import { isMobile, isLocal } from "../core/helpers";

const Game4Settings = {
  bonusBounds: {
    width: 100,
    height: 100,
  },

  heroBounds: {
    width: 86,
    height: 45,
    offsetTop: 20,
  },

  prizeBounds: {
    width: 28,
    height: 47,
    gap: 10,
    glow: 72,
  },

  prizeSources: [
    {
      src: require("../images/game4/prize1.png"),
    },
    {
      src: require("../images/game4/prize2.png"),
    },
    {
      src: require("../images/game4/prize3.png"),
    },
  ],

  topSources: [
    {
      src: require("../images/game4/top1.png"),
      width: 55,
      height: 300,
      ml: 11 + 5,
      mb: 11 + 5,
      mr: 11 + 5,
      mt: 0,
    },
    {
      src: require("../images/game4/top2.png"),
      width: 50,
      height: 300,
      ml: 7 + 5,
      mb: 0 + 5,
      mr: 3 + 5,
      mt: 0,
    },
    {
      src: require("../images/game4/top3.png"),
      width: 49,
      height: 300,
      ml: 2 + 5,
      mb: 0 + 5,
      mr: 0 + 5,
      mt: 0 + 5,
    },
    {
      src: require("../images/game4/top4.png"),
      width: 58,
      height: 300,
      ml: 10 + 5,
      mb: 2 + 5,
      mr: 3 + 5,
      mt: 0,
    },
    {
      src: require("../images/game4/top5.png"),
      width: 56,
      height: 300,
      ml: 5 + 5,
      mb: 0 + 5,
      mr: 3 + 5,
      mt: 0,
    },
    {
      src: require("../images/game4/top6.png"),
      width: 58,
      height: 300,
      ml: 10 + 5,
      mb: 0 + 5,
      mr: 3 + 5,
      mt: 0,
    },
    {
      src: require("../images/game4/top7.png"),
      width: 47,
      height: 300,
      ml: 2 + 5,
      mb: 0 + 5,
      mr: 0 + 5,
      mt: 0,
    },
    {
      src: require("../images/game4/top8.png"),
      width: 60,
      height: 300,
      ml: 10 + 5,
      mb: 0 + 5,
      mr: 5 + 5,
      mt: 0,
    },
  ],
  bottomSources: [
    {
      src: require("../images/game4/bottom1.png"),
      width: 81,
      height: 300,
      ml: 5 + 5,
      mb: 0,
      mr: 25 + 5,
      mt: 0 + 5,
    },
    {
      src: require("../images/game4/bottom2.png"),
      width: 80,
      height: 300,
      ml: 10 + 5,
      mb: 0,
      mr: 10 + 5,
      mt: 25 + 5,
    },
    {
      src: require("../images/game4/bottom3.png"),
      width: 54,
      height: 300,
      ml: 0 + 5,
      mb: 0,
      mr: 0 + 5,
      mt: 0 + 5,
    },
    {
      src: require("../images/game4/bottom4.png"),
      width: 56,
      height: 300,
      ml: 0 + 5,
      mb: 0,
      mr: 5 + 5,
      mt: 0 + 5,
    },
    {
      src: require("../images/game4/bottom5.png"),
      width: 45,
      height: 300,
      ml: 5 + 5,
      mb: 0,
      mr: 5 + 5,
      mt: 0 + 5,
    },
    {
      src: require("../images/game4/bottom6.png"),
      width: 48,
      height: 300,
      ml: 4 + 5,
      mb: 0,
      mr: 6 + 5,
      mt: 18 + 5,
    },
    {
      src: require("../images/game4/bottom7.png"),
      width: 41,
      height: 300,
      ml: 0 + 5,
      mb: 0,
      mr: 0 + 5,
      mt: 0 + 5,
    },
    {
      src: require("../images/game4/bottom8.png"),
      width: 79,
      height: 300,
      ml: 6 + 5,
      mb: 0,
      mr: 12 + 5,
      mt: 35 + 5,
    },
    {
      src: require("../images/game4/bottom9.png"),
      width: 41,
      height: 300,
      ml: 10 + 5,
      mb: 0,
      mr: 14 + 5,
      mt: 28 + 5,
    },
    {
      src: require("../images/game4/bottom10.png"),
      width: 38,
      height: 300,
      ml: 0 + 5,
      mb: 0,
      mr: 0 + 5,
      mt: 0 + 5,
    },
    {
      src: require("../images/game4/bottom11.png"),
      width: 70,
      height: 300,
      ml: 28 + 5,
      mb: 0,
      mr: 11 + 5,
      mt: 10 + 5,
    },
    {
      src: require("../images/game4/bottom12.png"),
      width: 67,
      height: 300,
      ml: 30 + 5,
      mb: 0,
      mr: 0 + 5,
      mt: 0 + 5,
    },
    {
      src: require("../images/game4/bottom13.png"),
      width: 79,
      height: 300,
      ml: 7 + 5,
      mb: 0,
      mr: 13 + 5,
      mt: 30 + 5,
    },
    {
      src: require("../images/game4/bottom14.png"),
      width: 65,
      height: 300,
      ml: 5 + 5,
      mb: 0,
      mr: 16 + 5,
      mt: 0 + 5,
    },
    {
      src: require("../images/game4/bottom15.png"),
      width: 55,
      height: 300,
      ml: 0 + 5,
      mb: 0,
      mr: 0 + 5,
      mt: 0 + 5,
    },
  ],

  parallaxSpeed1: 2,
  parallaxSpeed2: 6,
  parallaxSpeed3: 10,

  collisionDistance: 200,
  collisionStart: 100,

  columnDistance: 300,
  columnGap: 200,
  columnOffset: 180,
  startColumnCount: 5,

  startPosition: 300 * 3,

  heroStartPosition: -100,
  heroXPosition: 100,
  pushPower: 5, //10,
  heroWeight: 1, //3,

  prizeProb: 0.5,
  prizeValue: 3,

  bonusLife: 3,
  stepDuration: 80, //ms
  gameDuration: 60, //s
  startDuration: 500, //ms
  stopDuration: 3000, //ms
  animationDuration: 4000, //ms
  goHorizontalDuration: 1000, //m s
};

export default Game4Settings;
