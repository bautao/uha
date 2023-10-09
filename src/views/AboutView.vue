<template>
  <div class="about">
    <br>
    <p v-if="show">Simon Ehammer</p>
    <b-progress :value="70" :max="100" variant="success"></b-progress>
    <br>

    <p v-if="show2">Giger Samuel</p>

    <b-progress :value="50" :max="100" variant="warning"></b-progress>
    <br>
    <p v-if="show3">Marco Odermatt</p>

    <b-progress :value="30" :max="100"></b-progress>
    <br>
    <button @click="show = true">show 1</button>
    <button @click="show2 = true">show 2</button>
    <button @click="show3 = true">show 3</button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      show2: false,
      show3: false
    }
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
