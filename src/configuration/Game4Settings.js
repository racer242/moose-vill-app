import { isMobile, isLocal } from "../core/helpers";

const Game4Settings = {
  cardSources: [
    {
      id: "card1",
      src: require("../images/game4/hero-1.jpg"),
      rotation: 6.67,
      x: 76,
      y: 130,
    },
    {
      id: "card2",
      src: require("../images/game4/hero-2.jpg"),
      rotation: -4.13,
      x: 366,
      y: 130,
    },
    {
      id: "card3",
      src: require("../images/game4/hero-3.jpg"),
      rotation: 4.17,
      x: 655,
      y: 130,
    },
  ],

  dragThreshold: 20,

  startDuration: 500, //ms
  stopDuration: 3000, //ms
  animationDuration: 4000, //ms
};

export default Game4Settings;
