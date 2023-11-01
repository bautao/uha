<template>
  <div class="about">
    <div class="voteDiv" v-if="show">
      <h2>Wähle einen Sportler</h2>
      <br>
      <br>
      <b-button class="voteButton" @click="vote(1)" variant="warning">Simon Ehammer</b-button>
      <b-button class="voteButton" @click="vote(2)" variant="warning">Giger Samuel</b-button>
      <b-button class="voteButton" @click="vote(3)" variant="warning">Marco Odermatt</b-button>
    </div>
    <div class="voteDiv" v-else-if="voteNotActive">
      <p>Voting ist derzeit nicht aktiv.</p>

    </div>
    <div class="voteDiv" v-else-if="showWomen">
      <h2>Wähle eine Sportlerin</h2>
      <br>
      <br>
      <b-button class="voteButton" @click="voteWomen(1)" variant="warning">Lara Gut Behrami</b-button>
      <b-button class="voteButton" @click="voteWomen(2)" variant="warning">Mathilde Gremaud</b-button>
      <b-button class="voteButton" @click="voteWomen(3)" variant="warning">Simona Aebersold</b-button>
    </div>
    <div class="voteDiv" v-else-if="alreadyVoted">
      <p>Sie haben bereits abgestimmt.</p>

    </div>
    <div class="voteDiv" v-else>
      <h3>
        Danke für deine Stimme!
      </h3>
      <br>
      <p>Weitere Stimmen vom gleichen Gerät werden nicht mehr gewertet.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      show: true,
      ip: "init",
      showWomen: false,
      alreadyVoted: false,
      voteNotActive: false,
      message: ''
    }
  },
  methods: {
    vote(i) {
      this.show = false
      this.showWomen = true;
      this.sendVote(i)
    },
    async sendVote(i) {
      if (this.$cookies.isKey("voteMen")) {
        console.log("cookie exists")
        this.alreadyVoted = true
      } else {
        try {
          // const ip = await axios.get('https://api.ipify.org', {
          //   message: this.message
          // });
          // this.ip = ip.data;
          // console.log("ip: " + this.ip);

          const response = await axios.get(this.$url + '/vote/' + i, {
            message: this.message
          });

          if (response.data) {
            this.$cookies.set('voteMen', 'true', '4h');
          }else {
            this.voteNotActive = true
          }
        } catch (error) {
          console.error(error);
        }
      }
    },
    voteWomen(i) {
      this.showWomen = false;
      this.sendVoteWomen(i)
    },
    async sendVoteWomen(i) {
      if (this.$cookies.isKey("voteWomen")) {
        console.log("cookie exists")
        this.alreadyVoted = true
      } else {
        try {
          console.log(this.$showResult)
          const responseWoman = await axios.get(this.$url + '/voteWomen/' + i, {
            message: this.message
          });

          console.log(responseWoman.data);

          if (responseWoman.data) {
            this.$cookies.set('voteWomen', 'true', '4h');
          }
        } catch (error) {
          console.error(error);
        }
      }

    }
  }
}
</script>

<style>


.voteButton {
  min-width: 70%;
  float: left;
  margin-bottom: 30px;
}

.voteDiv {
  margin-top: 20%;
}

body {
  background: black;
  color: gold;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
  }
}
</style>
