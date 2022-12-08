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
    });
  },

  decreaseCounter(state, index) {
    state.list[index].value--;
  },

  filterByValue(state) {
    state.list
      ? state.list.forEach((counter) => {
          if (counter.value < state.minValue || counter.value > state.maxValue)
            counter.display = "none";
          else counter.display = "grid";
        })
      : [];
  },

  incrementCounter(state, index) {
    state.list[index].value++;
  },

  loadCounterList(state, list) {
    state.list = list;
  },

  removeCounter(state, index) {
    state.list.splice(index, 1);
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
  },

  updateMinValue(state, minValue) {
    state.minValue = minValue;
  },

  updateMaxValue(state, maxValue) {
    state.maxValue = maxValue;
  },

  updateInputValue(state, inputValue) {
    state.inputValue = inputValue;
  },
};

export const actions = {
  async fetchCounter(context) {
    const res = [
      {
        display: "grid",
        name: "Contador nº 1",
        index: 0,
        value: 3,
      },
      {
        display: "grid",
        name: "Contador nº 2",
        index: 1,
        value: 2,
      },
      {
        display: "grid",
        name: "Contador nº 3",
        index: 2,
        value: 11,
      },
      {
        display: "grid",
        name: "Contador nº 4",
        index: 3,
        value: 3,
      },
      {
        display: "grid",
        name: "Contador nº 5",
        index: 4,
        value: 2,
      },
      {
        display: "grid",
        name: "Contador nº 6",
        index: 5,
        value: 11,
      },
      {
        display: "grid",
        name: "Contador nº 7",
        index: 6,
        value: 3,
      },
      {
        display: "grid",
        name: "Contador nº 8",
        index: 7,
        value: 2,
      },
      {
        display: "grid",
        name: "Contador nº 9",
        index: 8,
        value: 11,
      },
      {
        display: "grid",
        name: "Contador nº 10",
        index: 9,
        value: 3,
      },
      {
        display: "grid",
        name: "Contador nº 11",
        index: 10,
        value: 2,
      },
      {
        display: "grid",
        name: "Contador nº 12",
        index: 11,
        value: 11,
      },
    ];
    context.commit("loadCounterList", res);
  },
};
