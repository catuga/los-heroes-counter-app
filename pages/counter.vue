<template>
  <div>
    <h1>Los Héroes Counter App</h1>

    <header>
      <button @click="sortByName('asc', 'name')">Ordenar ascendente por nombre</button>
      <button @click="sortByName('desc', 'name')">Ordenar descendente por nombre</button>

      <button @click="sortByName('asc', 'value')">Ordenar ascendente por valor</button>
      <button @click="sortByName('desc', 'value')">Ordenar descendente por valor</button>

      <hr />
      <!-- Mostrar contadores menores a: <input type="number" min="0" max="20" @input="filterByMinValue" />
      Mostrar contadores mayores a: <input type="number" min="0" max="20" @input="filterByMaxValue"/> -->

      <input type="text" id="min" placeholder="min" v-model="minValue" value="0">
      <input type="text" id="max" placeholder="max" v-model="maxValue" value="20">
      <button type="submit" @click="filterByValue">Filtrar</button>
       <button type="reset" @click="resetFilters" class="button">Eliminar filtros</button>
    </header>

    <ul>
      <h2>Lista de contadores</h2>
      <li v-for="({ name, value, display }, index) in counters" :key="index" :style="{ display }">
        <p>Nombre: {{ name }}</p>
        <p>Valor: {{ value }}</p>
        <button @click="incrementCounter(index)">+</button>
        <button @click="decreaseCounter(index)">-</button>
        <button @click="removeCounter(index)">Eliminar contador</button>
      </li>
      <hr />
      <button @click="onShowModal">Agregar contador</button>
    </ul>

    <footer>Suma de contadores: {{ countersSum }}</footer>

    <CounterModal v-show="showModal" @close-modal="hideModalRetrieveInput" />
  </div>
</template>
  
<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      showModal: false
    }
  },
  computed: {
    counters() {
      return this.$store.state.list;
    },
    minValue: {
      get() {
        return this.$store.state.minValue
      },
      set(value) {
        this.$store.commit('updateMinValue', value)
      }
    },
    maxValue: {
      get() {
        return this.$store.state.maxValue
      },
      set(value) {
        this.$store.commit('updateMaxValue', value)
      }
    },
    ...mapGetters(['countersSum'])
  },
  methods: {
    // Adds counter
    addCounter(name, index) {
      if (this.counters.length < 20) {
        this.$store.commit('addCounter', {
          name,
          index
        })
      }
    },

    // Decrease value of a counter by one
    decreaseCounter(index) {
      let currValue = this.counters[index].value;
      if (currValue-- > 0) {
        this.$store.commit('decreaseCounter', index);
      }
    },

    filterByValue() {
      this.$store.commit('filterByValue');
    },

    // Increase value of a counter by one
    incrementCounter(index) {
      let currValue = this.counters[index].value;
      if (currValue++ < 20) {
        this.$store.commit('incrementCounter', index);
      }
    },

    // Removes counter
    removeCounter(index) {
      this.$store.commit('removeCounter', index)
    },

    resetFilters() {
      this.$store.commit('resetFilters');
    },

    hideModalRetrieveInput(retrieve) {
      this.showModal = false;
      if (retrieve) {
        this.addCounter(this.$store.state.inputValue, this.counters.length);
      }
    },

    onShowModal() {
      this.$store.commit('updateInputValue', '');
      this.showModal = true;
    },

    sortByName(sortOrder, sortKey) {
      this.$store.commit('sortByName', { sortOrder, sortKey });
    },
  }
}
</script>