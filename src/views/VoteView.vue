<template>
  <div class="about">
    <div v-if="show">

    <b-button @click="vote()"variant="primary">Simon Ehammer</b-button>
    <br>
    <br>
    <b-button @click="vote()" variant="secondary">Giger Samuel</b-button>

    <br>
    <br>
    <b-button @click="vote()" variant="success">Marco Odermatt</b-button>
    <br>
    <br>
    </div>
    <div v-else>
      Danke für deine Stimme
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      show: true,
    }
  },
  methods: {
    vote() {
      this.show = false
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
