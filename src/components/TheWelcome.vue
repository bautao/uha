<script setup>
</script>

<template>
  <div>
    <b-progress :value="value1" :max="max" variant="success"></b-progress>
    <br>
    <b-progress :value="value2" :max="max" variant="warning"></b-progress>

    <br>
    <b-progress :value="value3" :max="max"></b-progress>
    <br>
    <button @click="vote(1)">vote1</button>
    <button @click="vote(2)">vote2</button>
    <button @click="vote(3)">vote3</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: 0,
      value2: 0,
      value3: 0,
      max: 0
    }
  },
  methods: {
    vote(choice) {
      switch (choice){
        case 1:
          this.value1++
          this.max++
          break
        case 2:
          this.value2++
          this.max++
          break
        case 3:
          this.value3++
          this.max++
          break
        default:
          break
      }
    }
  }
}
</script>
