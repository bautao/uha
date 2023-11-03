<template>
  <div class="about">
    <br>

    <h3>Voting:  {{active}}</h3>
<!--    <button @click="$showResult = true">{{ $showResult }}</button>-->
    <br>
    Marco Odermatt: {{vote3}} <br>
    Simon Ehammer: {{vote1}}<br>
    Giger Samuel: {{vote2}}<br>
    <br>
    <br>
    Lara Gut Behrami: {{womanVote1}}<br>
    Mathilde Gremaud: {{womanVote2}}<br>
    Simona Aebersold:{{womanVote3}} <br>


    <button @click="refreshVotes">Refresh votes</button>
    <br>
    <button @click="startVote">Start voting</button>
    <br>
    <button @click="endVote">End voting</button>
    <br>
    <button @click="show3rd">3ter Anzeigen</button>
    <br>
    <button @click="show1st">1 + 2 Anzeigen</button>
    <br>
    <button @click="show1stWomen">1 + 2 Frau Anzeigen</button>
    <br>
    <button @click="show3rdWomen">3te Frau Anzeigen</button>
    <br>
    <button @click="setShowSportler('false')">Sportlerin anzeigen</button>
    <br>
    <button @click="setShowSportler('true')">Sportler anzeigen</button>
    <br>
    <button @click="showNothing">Keine Namen mehr anzeigen</button>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      active: false,
      vote1: 0,
      vote2: 0,
      vote3: 0,
      womanVote1: 0,
      womanVote2: 0,
      womanVote3: 0
    }
  },
  created() {
    this.getActive()
    this.refreshVotes()
  },
  methods: {
    log() {
      console.log(this.$showResult)
    },
    async refreshVotes(){
      const response = await axios.get(this.$url + '/getVotes/' + 1, {});
      this.vote1 = response.data;

      const response2 = await axios.get(this.$url + '/getVotes/' + 2, {});
      this.vote2 = response2.data;

      const response3 = await axios.get(this.$url + '/getVotes/' + 3, {});
      this.vote3 = response3.data;

      const response4 = await axios.get(this.$url + '/getVotesWomen/' + 1, {});
      this.womanVote1 = response4.data;

      const response5 = await axios.get(this.$url + '/getVotesWomen/' + 2, {});
      this.womanVote2 = response5.data;

      const response6 = await axios.get(this.$url + '/getVotesWomen/' + 3, {});
      this.womanVote3 = response6.data;
      console.log(this.womanVote2)

    },
    async setShowSportler(show){
      await axios.get(this.$url + '/setShowSportler/'+show, {});
    },
    async startVote(){
      this.active = true
      await axios.get(this.$url + '/setVotingActive/true', {});
    },
    async endVote(){
      this.active = false
      await axios.get(this.$url + '/setVotingActive/false', {});
    },
    async getActive(){
      const response = await axios.get(this.$url + '/getVotingActive', {});
      this.active = response.data;
    },
    async show3rd(){
      await axios.get(this.$url + '/setShowing/3/true', {});
    },
    async show1st(){
      await axios.get(this.$url + '/setShowing/1/true', {});
    },
    async show3rdWomen(){
      await axios.get(this.$url + '/setShowingWomen/3/true', {});
    },
    async show1stWomen(){
      await axios.get(this.$url + '/setShowingWomen/1/true', {});
    },
    showNothing: async function () {
      await axios.get(this.$url + '/showNothing', {});
    }



  }
}
</script>

<style>
button {
  margin-top: 55px;
}


@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
