export const state = () => ({
    inputValue: '',
    minValue: null,
    maxValue: null,
    list: []
})

export const getters = {
    countersSum(state) {
        return state && state.list && state.list.length && state.list.length > 0 ? state.list
            .filter(function (x) { return typeof (x.value) === 'number' && x.display !== 'none' })
            .reduce(function (s, v) {return s + Number(v.value) }, 0) : 0;
    },
}

export const mutations = {
    addCounter(state, payload) {
        const { name, index } = payload;
        state.list.push({
            name,
            value: 0,
            index
        })
    },

    decreaseCounter(state, index) {
        state.list[index].value--
    },

    filterByValue(state) {
        state.list ? state.list.forEach(counter => {
            if (counter.value < state.minValue || counter.value > state.maxValue)
                counter.display = 'none';
            else
                counter.display = 'block';
        }) : [];
    },

    incrementCounter(state, index) {
        state.list[index].value++
    },

    loadCounterList(state, list) {
        state.list = list
    },

    removeCounter(state, index) {
        state.list.splice(index, 1)
    },

    resetFilters(state) {
        state.list ? state.list.forEach(counter => {
            counter.display = 'block';
        }) : [];
    },

    sortByName(state, payload) {
        const { sortOrder, sortKey } = payload;
        if (sortOrder === 'asc') {
            state.list.sort((a, b) => (a[sortKey] > b[sortKey]) ? 1 : -1);
        } else if (sortOrder === 'desc') {
            state.list.sort((a, b) => (a[sortKey] > b[sortKey]) ? -1 : 1);
        }
    },

    updateMinValue(state, minValue) {
        state.minValue = minValue
    },

    updateMaxValue(state, maxValue) {
        state.maxValue = maxValue
    },

    updateInputValue(state, inputValue) {
        state.inputValue = inputValue
    }
}

// @TODO
export const actions = {
    async fetchCounter(context) {
        const res = [{
            display: 'block',
            name: 'a',
            index: 0,
            value: 3
        },
        {
            display: 'block',
            name: 'b',
            index: 1,
            value: 2
        },
        {
            display: 'block',
            name: 'c',
            index: 2,
            value: 11
        }]
        context.commit('loadCounterList', res);
    }
}