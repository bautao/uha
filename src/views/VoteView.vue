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
      <input type="text" v-model="message" placeholder="Enter a message">

      <b-button @click="sendMessage()" variant="success">v</b-button>
    <br>
    <br>
    </div>
    <div v-else>
      Danke für deine Stimme
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      show: true,
      message: ''
    }
  },
  methods: {
    vote() {
      this.show = false
      this.sendVote()
    },
    async sendVote() {
      try {
        const response = await axios.get('https://13f7-2a00-d2e0-114-a300-75b2-3a9e-79a8-6dd0.ngrok.io/vote/1', {
          message: this.message
        });

        console.log(response.data);
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
