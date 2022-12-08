<template>
  <div>
    <header>
      <button @click="sortByName('asc', 'name')">
        Ordenar ascendente por nombre
      </button>
      <button @click="sortByName('desc', 'name')">
        Ordenar descendente por nombre
      </button>

      <button @click="sortByName('asc', 'value')">
        Ordenar ascendente por valor
      </button>
      <button @click="sortByName('desc', 'value')">
        Ordenar descendente por valor
      </button>

      <hr />

      <input
        type="text"
        id="min"
        placeholder="min"
        v-model="minValue"
        value="0"
      />
      <input
        type="text"
        id="max"
        placeholder="max"
        v-model="maxValue"
        value="20"
      />
      <button type="submit" @click="filterByValue">Filtrar</button>
      <button type="reset" @click="resetFilters" class="button">
        Eliminar filtros
      </button>
    </header>

    <ul>
      <li
        v-for="({ name, value, display }, index) in counters"
        :key="index"
        :style="{ display }"
      >
        <span>{{ name }}</span>
        <div>
          <button class="decrease" @click="decreaseCounter(index)">-</button>
          <span>{{ value }}</span>
          <button class="increase" @click="incrementCounter(index)">+</button>
        </div>
        <button class="delete" @click="removeCounter(index)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"
            />
          </svg>
        </button>
      </li>
      <hr />
      <button @click="onShowModal" class="add-counter">Agregar contador</button>
    </ul>

    <footer>Suma de contadores: {{ countersSum }}</footer>

    <CounterModal v-show="showModal" @close-modal="hideModalRetrieveInput" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    counters() {
      return this.$store.state.list;
    },
    minValue: {
      get() {
        return this.$store.state.minValue;
      },
      set(value) {
        this.$store.commit("updateMinValue", value);
      },
    },
    maxValue: {
      get() {
        return this.$store.state.maxValue;
      },
      set(value) {
        this.$store.commit("updateMaxValue", value);
      },
    },
    ...mapGetters(["countersSum"]),
  },
  created() {
    this.fetchCounter();
  },
  methods: {
    ...mapActions(["fetchCounter"]),

    // Adds counter
    addCounter(name, index) {
      if (
        (this.counters && this.counters.length && this.counters.length < 20) ||
        this.counters.length === 0
      ) {
        this.$store.commit("addCounter", {
          name,
          index,
        });
      }
    },

    // Decrease value of a counter by one
    decreaseCounter(index) {
      let currValue = this.counters[index].value;
      if (currValue-- > 0) {
        this.$store.commit("decreaseCounter", index);
      }
    },

    filterByValue() {
      this.$store.commit("filterByValue");
    },

    // Increase value of a counter by one
    incrementCounter(index) {
      let currValue = this.counters[index].value;
      if (currValue++ < 20) {
        this.$store.commit("incrementCounter", index);
      }
    },

    // Removes counter
    removeCounter(index) {
      this.$store.commit("removeCounter", index);
    },

    resetFilters() {
      this.$store.commit("resetFilters");
    },

    hideModalRetrieveInput(retrieve) {
      this.showModal = false;
      if (retrieve) {
        this.addCounter(
          this.$store.state.inputValue,
          this.counters && this.counters.length ? this.counters.length : 0
        );
      }
    },

    onShowModal() {
      this.$store.commit("updateInputValue", "");
      this.showModal = true;
    },

    sortByName(sortOrder, sortKey) {
      this.$store.commit("sortByName", { sortOrder, sortKey });
    },
  },
};
</script>

<style>
ul {
  padding-left: 0;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
ul li {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  background-color: hsl(131deg 48% 72%);
  border-radius: 7px;
  margin-bottom: 10px;
  padding: 7.5px 15px;
  align-items: center;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
ul li div {
  text-align: center;
}
ul li div span {
  width: 27px;
  display: inline-block;
}
ul li div .decrease {
  color: hsl(336deg 100% 46%);
}
ul li div .increase {
  color: hsl(116deg 72% 25%);
}
ul li .delete {
  border: none;
}
ul li .delete:hover {
  background-color: transparent;
}
ul li button {
  margin-bottom: 0;
}
ul .add-counter {
  font-size: 16px;
  border-radius: 10px;
}
</style>
