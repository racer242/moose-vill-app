import { isMobile, isLocal } from "../core/helpers";

const Game4Settings = {
  cardSources: [
    {
      id: 0,
      rotation: 6.67,
      x: 76,
      y: 130,
    },
    {
      id: 1,
      rotation: -4.13,
      x: 366,
      y: 130,
    },
    {
      id: 2,
      rotation: 4.17,
      x: 655,
      y: 130,
    },
  ],

  dragThreshold: 20,

  startDuration: 500, //ms
  stopDuration: 3000, //ms
  animationDuration: 4000, //ms
  sparkParticlesCount: 50,
};

export default Game4Settings;
