import { Component } from "react";

import { saveStorageData } from "../actions/appActions";

class Control extends Component {
  //--------------------------------------------------------------------------
  //
  // Constructor
  //
  //--------------------------------------------------------------------------

  constructor(props) {
    super(props);
    this.state = {};
    this.store = this.props.store;
  }

  //--------------------------------------------------------------------------
  //
  // React methods
  //
  //--------------------------------------------------------------------------

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

  //--------------------------------------------------------------------------
  //
  // Own methods
  //
  //--------------------------------------------------------------------------

  onStoreChange() {
    if (this.mounted) {
      let state = this.store.getState();
      if (state.dataForStorageChanged) {
        this.store.dispatch(saveStorageData());
      }
    }
  }

  render() {
    return null;
  }
}

export default Control;
