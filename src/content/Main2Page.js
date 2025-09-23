import React, { Component } from "react";
import { setStoreData } from "../actions/appActions";

import { ReactComponent as RAY_PINK } from "../images/game2/ray-pink.svg";
import { ReactComponent as RAY_PURPLE } from "../images/game2/ray-purple.svg";
import { ReactComponent as RAY_YELLOW } from "../images/game2/ray-yellow.svg";

class Main2Page extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    if (this.store) {
      this.state = {
        ...this.store.getState(),
      };
    } else this.state = {};

    this.startButton_clickHandler = this.startButton_clickHandler.bind(this);
    this.signUpWarning_clickHandler =
      this.signUpWarning_clickHandler.bind(this);
  }

  startButton_clickHandler(event) {
    this.store.dispatch(
      setStoreData({
        currentPage: "game",
      })
    );
  }

  signUpWarning_clickHandler(event) {
    if (this.state.signUpHandler) {
      this.state.signUpHandler();
    }
  }

  render() {
    let children = [];
    children.push(this.props.children);

    return (
      <div className="g2 mainPage">
        <div className="pageBg"></div>

        <div className="rays-left">
          <RAY_YELLOW className="ray lights-even" style={{ left: -98 }} />
          <RAY_PURPLE className="ray lights" style={{ left: -64 }} />
          <RAY_YELLOW className="ray lights-even" style={{ left: -18 }} />
          <RAY_PINK className="ray lights" style={{ left: 30 }} />
          <RAY_YELLOW className="ray lights-even" style={{ left: 67 }} />
          <RAY_PURPLE className="ray lights" style={{ left: 128 }} />
        </div>
        <div className="rays-right">
          <RAY_PINK className="ray lights" style={{ left: -93 }} />
          <RAY_YELLOW className="ray lights-even" style={{ left: -41 }} />
          <RAY_PURPLE className="ray lights" style={{ left: -6 }} />
          <RAY_YELLOW className="ray lights-even" style={{ left: 46 }} />
          <RAY_PINK className="ray lights" style={{ left: 80 }} />
          <RAY_YELLOW className="ray lights-even" style={{ left: 127 }} />
        </div>
        <div className="lamps-left"></div>
        <div className="lamps-right"></div>
        <div className="people dancing"></div>
        <div className="head appear-zoom">
          <div className="logo floating"></div>
          <h1>В свете софитов</h1>
        </div>
        <div className="plate appear-top delay500ms">
          <h3>
            Сделай настоящее шоу со звездой на сцене! Главное - не упускать
            ее&nbsp;из&nbsp;виду прожекторов, ведь она так любит внезапно
            появляться в разных местах сцены.
          </h3>
          <p className="orange">
            Звезда появляется на сцене, а ты подсвечивай её прожектором, для
            этого подведи луч к звезде за 2 секунды. Если пропустил три попытки
            поймать образ, то игра прекращается. Игра продлится 60 секунд, а за
            каждую удачную подсветку начисляется +1.
          </p>
        </div>
        <div
          className="primary-button button appear-bottom delay1s"
          onClick={this.startButton_clickHandler}
        >
          Играть
        </div>

        {this.state.userNotAuthorized && (
          <div
            className="signUpWarning appear-zoom"
            onClick={this.signUpWarning_clickHandler}
          >
            <span className="signUpLink">Зарегистрируйся</span> в Акции, чтобы
            сохранить результат игры
          </div>
        )}
      </div>
    );
  }
}

export default Main2Page;
