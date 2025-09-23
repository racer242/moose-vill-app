import { Component } from "react";

import {
  setStorageData,
  setStoreData,
  storageDataSaved,
} from "../actions/appActions";

import LocalStorageManager from "./LocalStorageManager";
import axios from "axios";
import { LOAD_ERROR } from "../utils/texts";

class DataManager extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    if (this.store) {
      this.state = {
        ...this.store.getState(),
      };
    } else
      this.state = {
        localStoreName: "local",
      };

    this.isLoading = false;
    this.localStorageManager = new LocalStorageManager({
      name: this.state.localStoreName,
    });
  }

  /* ++++ React methods ++++ */

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

  componentDidUpdate(prevProps, prevState) {}

  onStoreChange() {
    if (this.mounted) {
      let state = this.store.getState();
      this.setState({
        ...this.state,
        ...state,
      });
      if (!this.isLoading) {
        if (state.requestStart) {
          console.log("DataManager requestStart");
          this.requestStart(state.requestStart);
        } else if (state.requestFinish) {
          console.log("DataManager requestFinish");
          this.requestFinish(state.requestFinish);
        }
      }
      if (state.saveStorageData) {
        console.log("DataManager saveStorageData");
        this.saveStorageData();
      }
    }
  }

  async requestStart(action) {
    await this.load(
      action.request,
      action.data,
      {},
      "requestStart",
      "gameCredentials"
    );
  }

  async requestFinish(action) {
    await this.load(
      action.request,
      action.data,
      {},
      "requestFinish",
      "gameScores"
    );
  }

  loadStorageData() {
    let data = this.localStorageManager.load();
    this.store.dispatch(setStorageData(data));
  }

  saveStorageData() {
    // let state=this.store.getState();
    this.localStorageManager.save({});
    this.store.dispatch(storageDataSaved());
  }

  async load(source, data, headers, processId, dataId) {
    let JWT;

    this.isLoading = true;
    try {
      JWT = window.getJWT();
    } catch (error) {
      console.log("window.getJWT isn't set");
    }

    let response;
    try {
      response = await axios({
        ...source,
        data,
        headers: { ...headers, JWT },
      });
    } catch (e) {
      console.error("Request Error:", e.message, e.response);
      this.store.dispatch(
        setStoreData({
          showError: true,
          errorText: LOAD_ERROR,
          [processId]: false,
        })
      );
      this.isLoading = false;
      return;
    }

    if (response?.data) {
      if (response.data.result === "OK") {
        if (response?.data?.JWT) {
          try {
            window.saveJWT(response?.data?.JWT);
          } catch (error) {
            console.log("window.saveJWT isn't set");
          }
        } else {
          console.log("JWT isn't transferred");
        }
        this.store.dispatch(
          setStoreData({ [dataId]: response.data.data, [processId]: false })
        );
      } else {
        console.log("Error", response.data.errorText);
        this.store.dispatch(
          setStoreData({
            showError: true,
            errorText: response.data.errorText,
            [processId]: false,
          })
        );
      }
    } else {
      console.log("noData");
    }
    this.isLoading = false;
  }

  render() {
    return null;
  }
}
export default DataManager;
