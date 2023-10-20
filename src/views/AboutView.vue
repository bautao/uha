<template>
  <div class="about">
    <br>
    <p v-if="show">Simon Ehammer</p>
    <b-progress :value=vote1 :max="100" variant="success"></b-progress>
    <br>

    <p v-if="show2">Giger Samuel</p>

    <b-progress :value="1" :max="100" variant="warning"></b-progress>
    <br>
    <p v-if="show3">Marco Odermatt</p>

    <b-progress :value="2" :max="100"></b-progress>
    <br>
    <button @click="show = true">show 1</button>
    <button @click="show2 = true">show 2</button>
    <button @click="show3 = true">show 3</button>

  </div>
</template>

<script>
import axios from "axios";

export default {
  mounted: function () {
      this.timer = setInterval(() => {
        console.log("test " + this.getVotes())
      }, 2000)
  },
  data() {
    return {
      timer: null,
      vote1: this.getVotes(),
      vote2: 0,
      vote3: 0,
      show: false,
      show2: false,
      show3: false
    }
  },
  methods: {
    async getVotes() {
      try {
        const response = await axios.get('https://13f7-2a00-d2e0-114-a300-75b2-3a9e-79a8-6dd0.ngrok.io/getVotes/1', {
        });

        console.log(response.data);
        this.vote1 = response.data;
      } catch (error) {
        console.error(error);
      }
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
