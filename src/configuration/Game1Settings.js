import { isMobile, isLocal } from "../core/helpers";

const Game1Settings = {
  objectBounds: {
    width: 100,
    height: 100,
  },

  objSources: [
    {
      src: require("../images/game1/objects/good/o1.png"),
      bonus: 1,
      lifeProb: 2,
      lifeCount: 3,
      speed: 0.15,
    },
    {
      src: require("../images/game1/objects/good/o2.png"),
      bonus: 1,
      lifeProb: 2,
      lifeCount: 3,
      speed: 0.15,
    },
    {
      src: require("../images/game1/objects/good/o3.png"),
      bonus: 1,
      lifeProb: 2,
      lifeCount: 3,
      speed: 0.15,
    },
    {
      src: require("../images/game1/objects/good/o4.png"),
      bonus: 1,
      lifeProb: 2,
      lifeCount: 3,
      speed: 0.15,
    },
    {
      src: require("../images/game1/objects/good/o5.png"),
      bonus: 1,
      lifeProb: 2,
      lifeCount: 3,
      speed: 0.15,
    },
    {
      src: require("../images/game1/objects/good/o6.png"),
      bonus: 1,
      lifeProb: 2,
      lifeCount: 3,
      speed: 0.15,
    },
    {
      src: require("../images/game1/objects/good/o7.png"),
      bonus: 1,
      lifeProb: 2,
      lifeCount: 3,
      speed: 0.15,
    },
    {
      src: require("../images/game1/objects/good/o8.png"),
      bonus: 1,
      lifeProb: 2,
      lifeCount: 3,
      speed: 0.15,
    },
    {
      src: require("../images/game1/objects/good/o9.png"),
      bonus: 1,
      lifeProb: 2,
      lifeCount: 3,
      speed: 0.15,
    },
    {
      src: require("../images/game1/objects/good/o10.png"),
      bonus: 2,
      lifeProb: 2,
      lifeCount: 3,
      speed: 0.15,
    },
    {
      src: require("../images/game1/objects/good/o11.png"),
      bonus: 2,
      lifeProb: 2,
      lifeCount: 3,
      speed: 0.15,
    },
    {
      src: require("../images/game1/objects/good/o12.png"),
      bonus: 2,
      lifeProb: 2,
      lifeCount: 3,
      speed: 0.15,
    },

    {
      src: require("../images/game1/objects/bad/o1.png"),
      bonus: -1,
      lifeProb: 5,
      lifeCount: 6,
      speed: 0.05,
    },
    {
      src: require("../images/game1/objects/bad/o2.png"),
      bonus: -1,
      lifeProb: 5,
      lifeCount: 6,
      speed: 0.05,
    },
    {
      src: require("../images/game1/objects/bad/o3.png"),
      bonus: -1,
      lifeProb: 5,
      lifeCount: 6,
      speed: 0.05,
    },
    // {
    //   src: require("../images/game1/objects/bad/o4.png"),
    //   bonus: -1,
    //   lifeProb: 5,
    //   lifeCount: 6,
    //   speed: 0.05,
    // },
    {
      src: require("../images/game1/objects/bad/o5.png"),
      bonus: -1,
      lifeProb: 5,
      lifeCount: 6,
      speed: 0.05,
    },
    {
      src: require("../images/game1/objects/bad/o6.png"),
      bonus: -1,
      lifeProb: 5,
      lifeCount: 6,
      speed: 0.05,
    },
    {
      src: require("../images/game1/objects/bad/o7.png"),
      bonus: -1,
      lifeProb: 5,
      lifeCount: 6,
      speed: 0.05,
    },
    // {
    //   src: require("../images/game1/objects/bad/o9.png"),
    //   bonus: -1,
    //   lifeProb: 5,
    //   lifeCount: 6,
    //   speed: 0.05,
    // },
    {
      src: require("../images/game1/objects/bad/o10.png"),
      bonus: -1,
      lifeProb: 5,
      lifeCount: 6,
      speed: 0.05,
    },
  ],

  startObjCount: 10,

  newCount: 2,
  gridSize: 10,
  transitionDuration: 1000, //ms

  bonusLife: 3,

  stepDuration: 1100, //ms - не должно совпадать с 1000
  gameDuration: 60, //s
  stopDuration: 2000, //ms
};

export default Game1Settings;
