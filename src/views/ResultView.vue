<template>
  <div class="about">
    <div class="award-header">
      <h1>Busswiler Sports Awards</h1>

    </div>
    <div v-if="showSportler" class="voteContent">
      <h2>Sportler</h2>
      <br>
      <div v-if="show">
        <!--        <img width="100" height="100" src="../assets/odi.jpg" alt="odi">-->
        <h4>{{ first }}</h4>
      </div>
      <div v-else class="">
      </div>
      <b-progress height="3rem" :max=totalVotes variant="warning">
        <b-progress-bar :value=firstVote>
          <span><b>{{ firstPercent }}% </b></span>
        </b-progress-bar>
      </b-progress>
      <br>
      <h4 v-if="show2">{{ secondMen }}</h4>
      <b-progress height="3rem" :max=totalVotes variant="warning">
        <b-progress-bar :value=secondVote>

          <span><b>{{ secondPercent }}% </b></span>
        </b-progress-bar>
      </b-progress>
      <br>
      <h4 v-if="show3">{{ lowestMen }}</h4>

      <b-progress height="3rem" :max=totalVotes variant="warning">
        <b-progress-bar :value=thirdVote>

          <span><b>{{ thirdPercent }}% </b></span>
        </b-progress-bar>
      </b-progress>
      <br>

    </div>

    <div v-else class="voteContent">
      <h2>Sportlerin</h2>
      <br>
      <h4 v-if="showWomen">{{ firstWoman }}</h4>
      <div>
        <b-progress height="3rem" :max=totalVotesWomen variant="warning">
          <b-progress-bar :value=firstVoteWomen>
            <span><b>{{ firstPercentWomen }}% </b></span>
          </b-progress-bar>
        </b-progress>
      </div>
      <br>
      <h4 v-if="show2Women">{{ secondWomen }}</h4>
      <b-progress height="3rem" :max=totalVotesWomen variant="warning">
        <b-progress-bar :value=secondVoteWomen>
          <span><b>{{ secondPercentWomen }}% </b></span>
        </b-progress-bar>
      </b-progress>
      <br>
      <h4 v-if="show3Women">{{ lowestWomen }}</h4>
      <b-progress height="3rem" :max=totalVotesWomen variant="warning">
        <b-progress-bar :value=thirdVoteWomen>
          <span><b>{{ thirdPercentWomen }}% </b></span>
        </b-progress-bar>
      </b-progress>
      <br>
    </div>
    <img class="logo" src="../assets/buski.jpg" alt="buski">
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    this.getShowSportler()
  },
  computed: {
    totalVotes: function () {
      return this.vote1 + this.vote2 + this.vote3;
    },
    totalVotesWomen: function () {
      return this.vote1Women + this.vote2Women + this.vote3Women;
    },
    firstVote: function () {
      return this.sortedVote1;
    },
    secondVote: function () {
      return this.sortedVote2;
    },
    thirdVote: function () {
      return this.sortedVote3;
    },
    firstVoteWomen: function () {
      return this.sortedVoteWomen1;
    },
    secondVoteWomen: function () {
      return this.sortedVoteWomen2;
    },
    thirdVoteWomen: function () {
      return this.sortedVoteWomen3;
    },
    firstPercent: function () {
      return Math.round(this.sortedVote1 / this.totalVotes * 100);
    },
    secondPercent: function () {
      return Math.round(this.sortedVote2 / this.totalVotes * 100);
    },
    thirdPercent: function () {
      return Math.round(this.sortedVote3 / this.totalVotes * 100);
    },
    firstPercentWomen: function () {
      return Math.round(this.sortedVoteWomen1 / this.totalVotesWomen * 100);
    },
    secondPercentWomen: function () {
      return Math.round(this.sortedVoteWomen2 / this.totalVotesWomen * 100);
    },
    thirdPercentWomen: function () {
      return Math.round(this.sortedVoteWomen3 / this.totalVotesWomen * 100);
    },
    lowestMen: function () {
      let lowestValue;
      if (this.vote1 < this.vote2) {
        lowestValue = this.vote1
        this.lowestId = 1
        this.lowestName = "Simon Ehammer"
      } else {
        lowestValue = this.vote2
        this.lowestId = 2
        this.lowestName = "Giger Samuel"
      }
      if (lowestValue < this.vote3) {
        return this.lowestName;
      } else {
        this.lowestId = 3
        return "Marco Odermatt"
      }
    },
    secondMen: function () {
      if (this.lowestId == 3) { //odi last
        if (this.vote1 < this.vote2) {
          this.firstMen = "Giger Samuel"
          return "Simon Ehammer"
        } else {
          this.firstMen = "Simon Ehammer"
          return "Giger Samuel"
        }
      }
      if (this.lowestId == 2) { //sami last
        if (this.vote1 < this.vote3) {
          this.firstMen = "Marco Odermatt"
          return "Simon Ehammer"
        } else {
          this.firstMen = "Simon Ehammer"
          return "Marco Odermatt"
        }
      }
      if (this.lowestId == 1) { //simu last
        if (this.vote2 < this.vote3) {
          this.firstMen = "Marco Odermatt"
          return "Giger Samuel"
        } else {
          this.firstMen = "Giger Samuel"
          return "Marco Odermatt"
        }
      }

    },
    first: function () {
      return this.firstMen
    },
    lowestWomen: function () {
      let lowestValue;
      if (this.vote1Women < this.vote2Women) {
        lowestValue = this.vote1Women
        this.lowestIdWomen = 1
        this.lowestNameWomen = "Lara Gut Behrami"
      } else {
        lowestValue = this.vote2Women
        this.lowestIdWomen = 2
        this.lowestNameWomen = "Mathilde Gremaud"
      }
      if (lowestValue < this.vote3Women) {
        return this.lowestNameWomen;
      } else {
        this.lowestIdWomen = 3
        return "Simona Aebersold"
      }
    },
    secondWomen: function () {
      if (this.lowestIdWomen == 3) {
        if (this.vote1Women < this.vote2Women) {
          this.firstWomen = "Mathilde Gremaud"
          return "Lara Gut Behrami"
        } else {
          this.firstWomen = "Lara Gut Behrami"
          return "Mathilde Gremaud"
        }
      }
      if (this.lowestIdWomen == 2) {
        if (this.vote1Women < this.vote3Women) {
          this.firstWomen = "Simona Aebersold"
          return "Lara Gut Behrami"
        } else {
          this.firstWomen = "Lara Gut Behrami"
          return "Simona Aebersold"
        }
      }
      if (this.lowestIdWomen == 1) {
        if (this.vote2Women < this.vote3Women) {
          this.firstWomen = "Simona Aebersold"
          return "Mathilde Gremaud"
        } else {
          this.firstWomen = "Mathilde Gremaud"
          return "Simona Aebersold"
        }
      }

    },
    firstWoman: function () {
      return this.firstWomen
    },
  },
  mounted: function () {
    this.timer = setInterval(() => {
      console.log("updating")
      this.getVotes(1)
      this.getVotes(2)
      this.getVotes(3)
      this.getVotesWomen(1)
      this.getVotesWomen(2)
      this.getVotesWomen(3)
      this.refreshShowStatus()
      this.getShowSportler()
      this.sortBars()

    }, 4000)
  },
  data() {
    return {
      timer: null,
      lowestId: 0,
      lowestIdWomen: 0,
      firstMen: "",
      firstWomen: "",
      lowestName: 0,
      lowestNameWomen: 0,
      vote1: this.getVotes(1),
      vote2: this.getVotes(2),
      vote3: this.getVotes(3),
      vote1Women: this.getVotesWomen(1),
      vote2Women: this.getVotesWomen(2),
      vote3Women: this.getVotesWomen(3),
      sortedVote1: 0,
      sortedVote2: 0,
      sortedVote3: 0,
      sortedVoteWomen1: 0,
      sortedVoteWomen2: 0,
      sortedVoteWomen3: 0,
      show: false,
      show2: false,
      show3: false,
      showWomen: false,
      show2Women: false,
      show3Women: false,
      showSportler: true
    }
  },
  methods: {
    sortBars() {

      const votes = []
      votes.push(this.vote1, this.vote2, this.vote3)
      votes.sort()
      this.sortedVote1 = votes[2]
      this.sortedVote2 = votes[1]
      this.sortedVote3 = votes[0]

      const womanVotes = []
      womanVotes.push(this.vote1Women, this.vote2Women, this.vote3Women)
      womanVotes.sort()
      this.sortedVoteWomen1 = womanVotes[2]
      this.sortedVoteWomen2 = womanVotes[1]
      this.sortedVoteWomen3 = womanVotes[0]


      console.log("sorted" + votes)
      console.log("sorted" + this.vote3)

    },
    async getShowSportler() {
      const response = await axios.get(this.$url + '/getShowSportler', {});
      this.showSportler = response.data;
    },
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
          this.show3 = true
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
        // return response.data
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<style>
span {
  color: black;
}

.award-header {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 700px;
}

h1 {
  font-size: 60px;
}

.voteContent {
  position: relative;
  min-width: 1000px;
  width: 90%;
  height: 100%;
  padding-top: 25%;
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
