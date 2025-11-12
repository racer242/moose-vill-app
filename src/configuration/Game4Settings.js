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

  getResultDelay: 2000,
  showResultDelay: 3000,

  prizeChangeDuration: 300, //ms
  prizeChangeCount: 2,

  startDuration: 500, //ms
  stopDuration: 3000, //ms
  animationDuration: 4000, //ms

  sparkParticlesCount: 30,
  giftParticlesCount: 15,
};

export default Game4Settings;
