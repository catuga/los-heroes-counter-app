<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modal" @click.stop>
      <h3>Agregar nuevo contador</h3>
      <input v-model="inputValue" placeholder="Counter name" />
      <button @click="$emit('close-modal')">Cancel</button>
      <button @click="$emit('close-modal', true)" :disabled="(inputValue === '' || inputValue.length > 20)">Add counter</button>
    </div>
  </div>
</template>
  
<script>
export default {
  computed: {
    inputValue: {
      get() {
        return this.$store.state.inputValue
      },
      set(value) {
        this.$store.commit('updateInputValue', value)
      }
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  text-align: center;
  background-color: white;
  height: 500px;
  width: 500px;
  margin-top: 10%;
  padding: 60px 0;
  border-radius: 20px;
}

.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}
</style>