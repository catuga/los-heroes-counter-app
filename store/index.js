import nuxtStorage from "nuxt-storage";

export const state = () => ({
  inputValue: "",
  minValue: null,
  maxValue: null,
  list: [],
});

export const getters = {
  countersSum(state) {
    return state && state.list && state.list.length && state.list.length > 0
      ? state.list
          .filter(function (x) {
            return typeof x.value === "number" && x.display !== "none";
          })
          .reduce(function (s, v) {
            return s + Number(v.value);
          }, 0)
      : 0;
  },
};

export const mutations = {
  addCounter(state, payload) {
    const { name, index } = payload;
    state.list.push({
      name,
      value: 0,
      index,
      display: "grid",
    });
    nuxtStorage.localStorage.setData("counter", state.list);
  },

  decreaseCounter(state, index) {
    state.list[index].value--;
    nuxtStorage.localStorage.setData("counter", state.list);
  },

  filterByValue(state) {
    state.list
      ? state.list.forEach((counter) => {
          if (counter.value < state.minValue || counter.value > state.maxValue)
            counter.display = "none";
          else counter.display = "grid";
        })
      : [];
    nuxtStorage.localStorage.setData("counter", state.list);
  },

  incrementCounter(state, index) {
    state.list[index].value++;
    nuxtStorage.localStorage.setData("counter", state.list);
  },

  loadCounterList(state, list) {
    state.list = list;
  },

  removeCounter(state, index) {
    state.list.splice(index, 1);
    nuxtStorage.localStorage.setData("counter", state.list);
  },

  resetFilters(state) {
    state.list
      ? state.list.forEach((counter) => {
          counter.display = "grid";
        })
      : [];
  },

  sortByName(state, payload) {
    const { sortOrder, sortKey } = payload;
    if (sortOrder === "asc") {
      state.list.sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1));
    } else if (sortOrder === "desc") {
      state.list.sort((a, b) => (a[sortKey] > b[sortKey] ? -1 : 1));
    }
    nuxtStorage.localStorage.setData("counter", state.list);
  },

  updateMinValue(state, minValue) {
    state.minValue = minValue;
    nuxtStorage.sessionStorage.setData("minValue", minValue);
  },

  updateMaxValue(state, maxValue) {
    state.maxValue = maxValue;
    nuxtStorage.sessionStorage.setData("maxValue", maxValue);
  },

  updateInputValue(state, inputValue) {
    state.inputValue = inputValue;
  },
};

export const actions = {
  async fetchCounter(context) {
    const localStorageCounter = nuxtStorage.localStorage.getData("counter");
    context.commit(
      "loadCounterList",
      localStorageCounter ? localStorageCounter : []
    );
  },
};
