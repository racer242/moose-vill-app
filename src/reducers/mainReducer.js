var randomVal = 0;

const getNext = (a) => {
  let l = a.length;
  let v = a[randomVal % l];
  randomVal++;
  return v;
};

let mainReducerController = (state = {}, action) => {
  console.log("mainReducer", action);

  switch (action.type) {
    case "APP_INIT": {
      return {
        ...state,
        ...action.data,
        screens: 1,
        date: null,
      };
    }

    case "SET_STORE_DATA": {
      return {
        ...state,
        ...action.data,
        loaded: true,
      };
    }

    case "PRELOAD_COMPLETE": {
      return {
        ...state,
        preloaded: true,
      };
    }

    default:
      return state;
  }
};

const mainReducer = (state = {}, action) => {
  if (action.extraAction) {
    state = mainReducer(state, action.extraAction);
  }

  state = mainReducerController(state, action);

  return state;
};

export default mainReducer;
