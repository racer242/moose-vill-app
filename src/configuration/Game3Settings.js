import { isMobile, isLocal } from "../core/helpers";

const Game3Settings = {
  bonusBounds: {
    width: 100,
    height: 100,
  },

  ballSources: [
    {
      id: "ball1",
      x: 113,
      y: 224,
      src: require("../images/game3/balls/shar-1.png"),
      srcLight: require("../images/game3/balls/shar-1-light.png"),
    },
    {
      id: "ball2",
      x: 163,
      y: 140,
      src: require("../images/game3/balls/shar-2.png"),
      srcLight: require("../images/game3/balls/shar-2-light.png"),
    },
    {
      id: "ball3",
      x: 118,
      y: 398,
      src: require("../images/game3/balls/shar-3.png"),
      srcLight: require("../images/game3/balls/shar-3-light.png"),
    },
    {
      id: "ball4",
      x: 13,
      y: 398,
      src: require("../images/game3/balls/shar-4.png"),
      srcLight: require("../images/game3/balls/shar-4-light.png"),
    },
    {
      id: "ball5",
      x: 219,
      y: 398,
      src: require("../images/game3/balls/shar-5.png"),
      srcLight: require("../images/game3/balls/shar-5-light.png"),
    },
    {
      id: "ball6",
      x: 158,
      y: 309,
      src: require("../images/game3/balls/shar-6.png"),
      srcLight: require("../images/game3/balls/shar-6-light.png"),
    },
    {
      id: "ball7",
      x: 197,
      y: 224,
      src: require("../images/game3/balls/shar-7.png"),
      srcLight: require("../images/game3/balls/shar-7-light.png"),
    },
    {
      id: "ball8",
      x: 243,
      y: 309,
      src: require("../images/game3/balls/shar-8.png"),
      srcLight: require("../images/game3/balls/shar-8-light.png"),
    },
    {
      id: "ball9",
      x: 63,
      y: 309,
      src: require("../images/game3/balls/shar-9.png"),
      srcLight: require("../images/game3/balls/shar-9-light.png"),
    },
  ],
  bonusLife: 3,

  transitionDuration: 200, //ms

  stepDuration: 500, //ms
  gameDuration: 60, //s
  stopDuration: 2000, //ms
  animationDuration: 4000, //ms
};

export default Game3Settings;
