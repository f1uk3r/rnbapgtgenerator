import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    teamsData: {
      "ATL": [
        "Atlanta Hawks",
        "01",
        "atlanta-hawks-",
        "http://np.reddit.com/r/atlantahawks",
        "1610612737",
        "atl",
        "atlantahawks"
      ],
      "BKN": [
        "Brooklyn Nets",
        "02",
        "boston-celtics-",
        "http://np.reddit.com/r/bostonceltics",
        "1610612738",
        "bkn",
        "bostonceltics"
      ],
      "BOS": [
        "Boston Celtics",
        "17",
        "brooklyn-nets-",
        "http://np.reddit.com/r/gonets",
        "1610612751",
        "bos",
        "gonets"
      ],
      "CHA": [
        "Charlotte Hornets",
        "30",
        "charlotte-hornets-",
        "http://np.reddit.com/r/charlottehornets",
        "1610612766",
        "cha",
        "charlottehornets"
      ],
      "CHI": [
        "Chicago Bulls",
        "04",
        "chicago-bulls-",
        "http://np.reddit.com/r/chicagobulls",
        "1610612741",
        "chi",
        "chicagobulls"
      ],
      "CLE": [
        "Cleveland Cavaliers",
        "05",
        "cleveland-cavaliers-",
        "http://np.reddit.com/r/clevelandcavs",
        "1610612739",
        "cle",
        "clevelandcavs"
      ],
      "DAL": [
        "Dallas Mavericks",
        "06",
        "dallas-mavericks-",
        "http://np.reddit.com/r/mavericks",
        "1610612742",
        "dal",
        "mavericks"
      ],
      "DEN": [
        "Denver Nuggets",
        "07",
        "denver-nuggets-",
        "http://np.reddit.com/r/denvernuggets",
        "1610612743",
        "den",
        "denvernuggets"
      ],
      "DET": [
        "Detroit Pistons",
        "08",
        "detroit-pistons-",
        "http://np.reddit.com/r/detroitpistons",
        "1610612765",
        "det",
        "detroitpistons"
      ],
      "GSW": [
        "Golden State Warriors",
        "09",
        "golden-state-warriors-",
        "http://np.reddit.com/r/warriors",
        "1610612744",
        "gsw",
        "warriors"
      ],
      "HOU": [
        "Houston Rockets",
        "10",
        "houston-rockets-",
        "http://np.reddit.com/r/rockets",
        "1610612745",
        "hou",
        "rockets"
      ],
      "IND": [
        "Indiana Pacers",
        "11",
        "indiana-pacers-",
        "http://np.reddit.com/r/pacers",
        "1610612754",
        "ind",
        "pacers"
      ],
      "LAC": [
        "Los Angeles Clippers",
        "12",
        "los-angeles-clippers-",
        "http://np.reddit.com/r/laclippers",
        "1610612746",
        "lac",
        "laclippers"
      ],
      "LAL": [
        "Los Angeles Lakers",
        "13",
        "los-angeles-lakers-",
        "http://np.reddit.com/r/lakers",
        "1610612747",
        "lal",
        "lakers"
      ],
      "MEM": [
        "Memphis Grizzlies",
        "29",
        "memphis-grizzlies-",
        "http://np.reddit.com/r/memphisgrizzlies",
        "1610612763",
        "mem",
        "memphisgrizzlies"
      ],
      "MIA": [
        "Miami Heat",
        "14",
        "miami-heat-",
        "http://np.reddit.com/r/heat",
        "1610612748",
        "mia",
        "heat"
      ],
      "MIL": [
        "Milwaukee Bucks",
        "15",
        "milwaukee-bucks-",
        "http://np.reddit.com/r/mkebucks",
        "1610612749",
        "mil",
        "mkebucks"
      ],
      "MIN": [
        "Minnesota Timberwolves",
        "16",
        "minnesota-timberwolves-",
        "http://np.reddit.com/r/timberwolves",
        "1610612750",
        "min",
        "timberwolves"
      ],
      "NOP": [
        "New Orleans Pelicans",
        "03",
        "new-orleans-pelicans-",
        "http://np.reddit.com/r/nolapelicans",
        "1610612740",
        "nop",
        "nolapelicans"
      ],
      "NYK": [
        "New York Knicks",
        "18",
        "new-york-knicks-",
        "http://np.reddit.com/r/nyknicks",
        "1610612752",
        "nyk",
        "nyknicks"
      ],
      "OKC": [
        "Oklahoma City Thunder",
        "25",
        "oklahoma-city-thunder-",
        "http://np.reddit.com/r/thunder",
        "1610612760",
        "okc",
        "thunder"
      ],
      "ORL": [
        "Orlando Magic",
        "19",
        "orlando-magic-",
        "http://np.reddit.com/r/orlandomagic",
        "1610612753",
        "orl",
        "orlandomagic"
      ],
      "PHI": [
        "Philadelphia 76ers",
        "20",
        "philadelphia-76ers-",
        "http://np.reddit.com/r/sixers",
        "1610612755",
        "phi",
        "sixers"
      ],
      "PHX": [
        "Phoenix Suns",
        "21",
        "phoenix-suns-",
        "http://np.reddit.com/r/suns",
        "1610612756",
        "phx",
        "suns"
      ],
      "POR": [
        "Portland Trail Blazers",
        "22",
        "portland-trail-blazers-",
        "http://np.reddit.com/r/ripcity",
        "1610612757",
        "por",
        "ripcity"
      ],
      "SAC": [
        "Sacramento Kings",
        "23",
        "sacramento-kings-",
        "http://np.reddit.com/r/kings",
        "1610612758",
        "sac",
        "kings"
      ],
      "SAS": [
        "San Antonio Spurs",
        "24",
        "san-antonio-spurs-",
        "http://np.reddit.com/r/nbaspurs",
        "1610612759",
        "sas",
        "nbaspurs"
      ],
      "TOR": [
        "Toronto Raptors",
        "28",
        "toronto-raptors-",
        "http://np.reddit.com/r/torontoraptors",
        "1610612761",
        "tor",
        "torontoraptors"
      ],
      "UTA": [
        "Utah Jazz",
        "26",
        "utah-jazz-",
        "http://np.reddit.com/r/utahjazz",
        "1610612762",
        "uta",
        "utahjazz"
      ],
      "WAS": [
        "Washington Wizards",
        "27",
        "washington-wizards-",
        "http://np.reddit.com/r/washingtonwizards",
        "1610612764",
        "was",
        "washingtonwizards"
      ],
    },
    dateYesterday: '',
    dateToday: '',
    yesterdayLastGameEnd: false,
    todayLastGameEnd: false,
    baseUrl: 'https://data.nba.net/prod/v1/',
    scoreboardSuffix: '/scoreboard.json/'
  },
  getters: {
    teamsData: state => state.teamsData,
    dateYesterday: state => state.dateYesterday,
    dateToday: state => state.dateToday,
    yesterdayLastGameEnd: state => state.yesterdayLastGameEnd,
    todayLastGameEnd: state => state.todayLastGameEnd,
    baseUrl: state => state.baseUrl,
    scoreboardSuffix: state => state.scoreboardSuffix
  },
  mutations: {
    setYesterdayLastGameEnd (state) {
      state.yesterdayLastGameEnd = true
    },
    setTodayGameEnd (state) {
      state.todayLastGameEnd = true
    },
    setDates (state) {
      let date = new Date()
      let yesterday = new Date(date)
      let dateNow = date.toISOString().slice(0,10)
      state.dateToday = dateNow.replaceAll("-", "")
      yesterday.setDate(yesterday.getDate() - 1)
      state.dateYesterday = yesterday.toISOString().slice(0,10).replaceAll("-", "")
    },
    setDatesWhenYesterdayGameNotOver (state) {
      let date = new Date()
      let today = new Date(date)
      today.setDate(today.getDate() - 1)
      state.dateToday = today.toISOString().slice(0, 10).replaceAll("-", "")
      let yesterday = new Date(date)
      yesterday.setDate(yesterday.getDate() - 2)
      state.dateYesterday = yesterday.toISOString().slice(0, 10).replaceAll("-", "")
    }
  },
  actions: {
    initialiseDates (context) {
      context.commit('setDates')
    },
    initialiseDatesWhenYesterdayGameNotOver (context) {
      context.commit('setDatesWhenYesterdayGameNotOver')
    },
    checkYesterdayLastGameEnd (context) {
      axios.get(this.state.baseUrl + this.state.dateYesterday + this.state.scoreboardSuffix, {
        crossDomain: true
      }).then((response) => {
          let lastGameSummaryData = response.data.games[response.data.numGames - 1]
          if ((lastGameSummaryData.clock === '' || lastGameSummaryData.clock === "0.0") && lastGameSummaryData.period.current >= 4 && (lastGameSummaryData.vTeam.score !== lastGameSummaryData.hTeam.score)) {
            context.commit('setDates')
          }
          else {
            console.log('hello')
            context.commit('setDatesWhenYesterdayGameNotOver')
          }
        })
    },
    checkTodayLastGameEnd (context) {
      axios.get(this.state.baseUrl + this.state.dateToday + this.state.scoreboardSuffix, {
        crossDomain: true
      }).then((response) => {
          let lastGameSummaryData = response.data.games[response.data.numGames - 1]
          if ((lastGameSummaryData.clock === '' || lastGameSummaryData.clock === "0.0") && lastGameSummaryData.period.current >= 4 && (lastGameSummaryData.vTeam.score !== lastGameSummaryData.hTeam.score)) {
            context.commit('setTodayGameEnd')
          }
        })
    }
  }
})