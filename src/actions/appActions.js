export const appInit = (data) => {
  return {
    type: "APP_INIT",
    data: {
      ...data,
    },
  };
};

export const setStoreData = (data) => {
  return {
    type: "SET_STORE_DATA",
    data: {
      ...data,
    },
  };
};

export const setAppData = (data) => {
  return {
    type: "SET_APP_DATA",
    data,
  };
};

export const setStorageData = (data) => {
  return {
    type: "SET_STORAGE_DATA",
    data,
  };
};

export const saveStorageData = () => {
  return {
    type: "SAVE_STORAGE_DATA",
    data: {
      saveStorageData: true,
      dataForStorageChanged: null,
    },
  };
};

export const storageDataSaved = () => {
  return {
    type: "STORAGE_DATA_SAVED",
    data: {
      saveStorageData: false,
    },
  };
};

export const preloadComplete = () => {
  return {
    type: "PRELOAD_COMPLETE",
  };
};
