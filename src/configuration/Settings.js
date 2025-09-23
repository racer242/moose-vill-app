import { isMobile, isLocal } from "../core/helpers";

const settings = {
  assetsUrl: ".",
  localStoreName: "appState_120225",

  isMobile: isMobile(),
  isLocal: isLocal(),

  desktopBounds: {
    width: 960,
    height: 540,
  },
  mobileBounds: {
    width: 540,
    height: 860,
  },
  switchToMobileWidth: 720,
  currentPage: "main",
  particlesCount: 30,
};

export default settings;
