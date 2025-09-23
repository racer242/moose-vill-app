import React, { Component } from "react";

import PageStack from "../components/PageStack.js";
import Preloader from "../components/Preloader.js";
import AboutPopup from "../content/AboutPopup.js";
import { setStoreData } from "../actions/appActions.js";
import settings from "../configuration/Settings.js";

class Container extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;

    this.defaultDesktopBounds = settings.desktopBounds;
    this.defaultMobileBounds = settings.mobileBounds;
    this.defaultSwitchToMobileWidth = settings.switchToMobileWidth;

    this.state = {};

    this.lastBounds = {
      pageBounds: {},
      pageScale: 1,
      pageX: 0,
      pageY: 0,
      mobileSize: false,
    };

    this.ref = React.createRef();

    this.closeAboutPopup_clickHandler =
      this.closeAboutPopup_clickHandler.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      this.onStoreChange();
    });
    this.mounted = true;
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.mounted = false;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  onStoreChange() {
    if (this.mounted) {
      let state = this.store.getState();
      this.setState({ ...this.state, ...state });
    }
  }

  closeAboutPopup_clickHandler(event) {
    this.store.dispatch(setStoreData({ aboutPopup: false }));
  }

  updateBounds(width, height) {
    let pageBounds = {};
    let mobileSize = false;

    if (!this.state.desktopBounds) {
      this.state.desktopBounds = this.defaultDesktopBounds;
      this.state.mobileBounds = this.defaultMobileBounds;
      this.state.switchToMobileWidth = this.defaultSwitchToMobileWidth;
    }

    // if (this.lastWidth !== width || this.lastHeight !== height) {
    // this.lastWidth = width;
    // this.lastHeight = height;

    if (width > this.state.switchToMobileWidth) {
      pageBounds.width = this.state.desktopBounds.width;
      pageBounds.height = this.state.desktopBounds.height;
    } else {
      pageBounds.width = this.state.mobileBounds.width;
      pageBounds.height = this.state.mobileBounds.height;
      mobileSize = true;
    }

    let pageScale = Math.min(
      width / pageBounds.width,
      height / pageBounds.height
    );
    let pageX = (width - pageBounds.width) / 2 / pageScale;
    let pageY = (height - pageBounds.height) / 2 / pageScale;

    this.lastBounds = {
      pageBounds,
      pageScale,
      pageX,
      pageY,
      pageWidth: width,
      blockHeight: height,
      blockInnerHeight: height / pageScale,
      mobileSize,
      position: this.ref?.current?.getBoundingClientRect(),
    };
    // }

    return this.lastBounds;
  }

  render() {
    let b = this.updateBounds(this.props.windowWidth, this.props.windowHeight);
    let children = [];
    children.push(this.props.children);
    children.push(
      <div
        className={"page" + (b.mobileSize ? " mobile" : "")}
        key="Page"
        ref={this.ref}
        style={{
          width: b.pageBounds.width,
          height: b.pageBounds.height,
          transform: `scale(${b.pageScale}) translateX(${b.pageX}px) translateY(${b.pageY}px)`,
        }}
      >
        <PageStack bounds={b} store={this.store} />
        {!this.state.preloaded && (
          <Preloader store={this.store} key="Preloader" />
        )}

        {this.state.aboutPopup && (
          <AboutPopup
            key="AboutPopup"
            onClose={this.closeAboutPopup_clickHandler}
          />
        )}
      </div>
    );

    return React.createElement("div", { id: "Container" }, children);
  }
}

export default Container;
