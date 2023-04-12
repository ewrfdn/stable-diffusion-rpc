import { createStore } from "vuex";
import _ from "lodash";

function getLocalStorageData() {
  let localData = localStorage.getItem("records");
  if (localData === null || localData === undefined) {
    return [];
  } else {
    return JSON.parse(localData);
  }
}

function setLocalStorageData(data) {
  localStorage.setItem("records", JSON.stringify(data));
}

export default createStore({
  state() {
    return {
      records: getLocalStorageData(),
      periodDays: 14,
    };
  },

  mutations: {
    addRecord(state, item) {
      state.records.push(item);
      setLocalStorageData(state.records);
    },
    delRecord(state, itemId) {
      _.remove(state.records, (r) => {
        if (r["id"] == itemId) {
          return true;
        } else {
          return false;
        }
      });

      setLocalStorageData(state.records);
    },
    setPeriodDays(state, days) {
      state.periodDays = days;
    },
  },

  actions: {},
});
