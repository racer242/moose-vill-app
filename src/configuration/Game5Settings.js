import { isMobile, isLocal } from "../core/helpers";

const Game5Settings = {
  scenes: [
    {
      objects: [{ area: "s32", x: 60, y: 350 }],
      src: require("../images/game5/scene1.png"),
    },
    {
      objects: [{ area: "s29", x: 62, y: 198 }],
      src: require("../images/game5/scene2.png"),
    },
    {
      objects: [{ area: "s27", x: 26, y: 128 }],
      src: require("../images/game5/scene3.png"),
    },
    {
      objects: [{ area: "s23", x: 62, y: 115 }],
      src: require("../images/game5/scene4.png"),
    },
    {
      objects: [{ area: "s20", x: 20, y: 35 }],
      src: require("../images/game5/scene5.png"),
    },
    {
      objects: [{ area: "s18", x: 26, y: 360 }],
      src: require("../images/game5/scene6.png"),
    },
    {
      objects: [{ area: "s8", x: 15, y: 300 }],
      src: require("../images/game5/scene7.png"),
    },
  ],

  objectRadius: 20,

  mobileScale: 1,

  sectionCount: 36,
  sceneWidth: 2377, //3200, //3607,
  sceneHeight: 440,
  idleSpeed: 0.3,
  inertia: 3,

  stepDuration: 200, //ms
  gameDuration: 60, //s
  stopDuration: 500, //ms
  startDuration: 2000, //ms
  startGameDuration: 500, //ms
  winDuration: 2000, //ms
  dragDuration: 0, //ms
  selectDuration: 200, //ms

  selectPrizeCount: 5,
};

export default Game5Settings;
