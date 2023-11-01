<template>
  <div class="about">
    <div class="award-header">
      <h1>Busswiler sports awards</h1>

    </div>
    <div class="voteContent">
      <h2>Sportler</h2>
      <br>
      <div v-if="show3">
        <!--        <img width="100" height="100" src="../assets/odi.jpg" alt="odi">-->
        <h4>Marco Odermatt</h4>
      </div>
      <b-progress height="2rem" :max=totalVotes variant="warning">
        <b-progress-bar :value=vote3 :label="`${(thirdPercent)}%`"></b-progress-bar>
      </b-progress>
      <br>
      <h4 v-if="show">Simon Ehammer</h4>
      <!--      {{ firstPercent }}-->
      <!--      <b-progress :value=vote1 :max=totalVotes show-progress variant="success"></b-progress>-->
      <b-progress height="2rem" :max=totalVotes variant="warning">
        <b-progress-bar :value=vote1 :label="`${(firstPercent)}%`"></b-progress-bar>
      </b-progress>
      <br>
      <!--      {{ secondPercent }}-->
      <h4 v-if="show2">Giger Samuel</h4>

      <!--      <b-progress :value=vote2 :max=totalVotes show-progress variant="warning"></b-progress>-->
      <b-progress height="2rem" :max=totalVotes variant="warning">
        <b-progress-bar :value=vote2 :label="`${(secondPercent)}%`"></b-progress-bar>
      </b-progress>
      <br>

    </div>

    <div class="voteContent">
      <h2>Sportlerin</h2>
      <br>
      <h4 v-if="showWomen">Lara Gut Behrami</h4>
      <div>
        <!--        {{ firstPercentWomen }}-->
        <!--        <b-progress :value=vote1Women show-progress :max=totalVotesWomen variant="success"></b-progress>-->

        <b-progress height="2rem" :max=totalVotesWomen variant="warning">
          <b-progress-bar :value=vote1Women :label="`${(firstPercentWomen)}%`"></b-progress-bar>
        </b-progress>
      </div>
      <br>

      <!--      {{ secondPercentWomen }}-->
      <h4 v-if="show2Women">Mathilde Gremaud</h4>

      <!--      <b-progress :value=vote2Women show-progress :max=totalVotesWomen variant="warning"></b-progress>-->
      <b-progress height="2rem" :max=totalVotesWomen variant="warning">
        <b-progress-bar :value=vote2Women :label="`${(secondPercentWomen)}%`"></b-progress-bar>
      </b-progress>
      <br>
      <!--      {{ thirdPercentWomen }}-->
      <h4 v-if="show3Women">Simona Aebersold</h4>

      <!--      <b-progress :value=vote3Women show-progress :max=totalVotesWomen></b-progress>-->

      <b-progress height="2rem" :max=totalVotesWomen variant="warning">
        <b-progress-bar :value=vote3Women :label="`${(thirdPercentWomen)}%`"></b-progress-bar>
      </b-progress>
      <br>
    </div>
    <img class="logo" src="../assets/buski.jpg" alt="buski">
  </div>
</template>

<script>
import axios from "axios";

export default {
  computed: {
    totalVotes: function () {
      return this.vote1 + this.vote2 + this.vote3;
    },
    totalVotesWomen: function () {
      return this.vote1Women + this.vote2Women + this.vote3Women;
    },
    firstPercent: function () {
      return Math.round(this.vote1 / this.totalVotes * 100);
    },
    secondPercent: function () {
      return Math.round(this.vote2 / this.totalVotes * 100);
    },
    thirdPercent: function () {
      return Math.round(this.vote3 / this.totalVotes * 100);
    },
    firstPercentWomen: function () {
      return Math.round(this.vote1Women / this.totalVotesWomen * 100);
    },
    secondPercentWomen: function () {
      return Math.round(this.vote2Women / this.totalVotesWomen * 100);
    },
    thirdPercentWomen: function () {
      return Math.round(this.vote3Women / this.totalVotesWomen * 100);
    },
    lowestMen: function () {
      let lowestValue;
      let lowestId;
      if (this.vote1 < this.vote2) {
        lowestValue = this.vote1
        lowestId = 1
      } else {
        lowestValue = this.vote2
        lowestId = 2
      }
      if (lowestValue < this.vote3) {
        return lowestId;
      } else
        return 3
    },
    lowestWomen: function () {
      let lowestValue;
      let lowestId;
      if (this.vote1Women < this.vote2Women) {
        lowestValue = this.vote1Women
        lowestId = 1
      } else {
        lowestValue = this.vote2Women
        lowestId = 2
      }
      if (lowestValue < this.vote3Women) {
        return lowestId;
      } else
        return 3
    }
  },
  mounted: function () {
    this.timer = setInterval(() => {
      console.log("interval")
      this.getVotes(1)
      this.getVotes(2)
      this.getVotes(3)
      this.getVotesWomen(1)
      this.getVotesWomen(2)
      this.getVotesWomen(3)
      this.refreshShowStatus()

    }, 4000)
  },
  data() {
    return {
      timer: null,
      vote1: this.getVotes(1),
      vote2: this.getVotes(2),
      vote3: this.getVotes(3),
      vote1Women: this.getVotesWomen(1),
      vote2Women: this.getVotesWomen(2),
      vote3Women: this.getVotesWomen(3),
      show: false,
      show2: false,
      show3: false,
      showWomen: false,
      show2Women: false,
      show3Women: false
    }
  },
  methods: {
    async refreshShowStatus() {
      try {
        console.log("start")
        const response = await axios.get(this.$url + '/getShowing/1', {});
        console.log("showing: " + response.data)
        if (response.data) { // show all men
          this.show = true
          this.show2 = true
          this.show3 = true
        }
        const response2 = await axios.get(this.$url + '/getShowing/3', {});
        if (response2.data) { // show 3rd men
          switch (this.lowestMen) {
            case 1:
              this.show = true
              break;
            case 2:
              this.show2 = true
              break;
            case 3:
              this.show3 = true
              break;
            default:
              this.show3 = true
          }
        }

        const responseWomen = await axios.get(this.$url + '/getShowingWomen/1', {});
        if (responseWomen.data) { // show all women
          this.showWomen = true
          this.show2Women = true
          this.show3Women = true
        }
        const response2Women = await axios.get(this.$url + '/getShowingWomen/3', {});
        if (response2Women.data) { // show third women
          switch (this.lowestWomen) {
            case 1:
              this.showWomen = true
              break;
            case 2:
              this.show2Women = true
              break;
            case 3:
              this.show3Women = true
              break;
            default:
              this.show3Women = true
              break
          }
        }


      } catch (error) {
        console.log(error)
      }
    },
    async getVotes(i) {
      try {
        const response = await axios.get(this.$url + '/getVotes/' + i, {});

        // console.log(i + ": " + response.data);
        switch (i) {
          case 1:
            this.vote1 = response.data
            break
          case 2:
            this.vote2 = response.data
            break
          case 3:
            this.vote3 = response.data
            break
          default:
            break
        }
        console.log(i + ": " + response.data)
        console.log("total: " + this.totalVotes)
        console.log("result: " + this.$showResult)
        // return response.data
      } catch (error) {
        console.error(error);
      }
    },
    async getVotesWomen(i) {
      try {
        const response = await axios.get(this.$url + '/getVotesWomen/' + i, {});

        // console.log(i + ": " + response.data);
        switch (i) {
          case 1:
            this.vote1Women = response.data
            break
          case 2:
            this.vote2Women = response.data
            break
          case 3:
            this.vote3Women = response.data
            break
          default:
            break
        }
        console.log(i + ": " + response.data)
        console.log("total: " + this.totalVotesWomen)
        console.log("result: " + this.$showResult)
        // return response.data
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<style>

.award-header{
  position: absolute;
  top:1%;
  left:5%;
  width: 700px;
}
h1 {
  font-size: 60px;
}

.voteContent {
  position: relative;
  min-width: 600px;
  width: 90%;
  height: 100%;
  padding-top: 20%;
  padding-right: 100px;
}

body {
  background: black;
  color: gold;
}

.logo {
  width: 10%;
  height: 30%;
  position: absolute;
  bottom: 5%;
  right: 5%;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
