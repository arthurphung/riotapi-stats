import axios from 'axios'
import React from 'react'

let championByIdCache = {}
let championJson = {}

export class SummonerPage extends React.Component {
  constructor() {
    super()
    this.state = {
      value: '',
      accId: '',
      gameId: '',
      champion: 0,
      gameMode: '',
      championName: '',
      teamId: 0,
      teamOutcome: '',
      kills: 0,
      deaths: 0,
      assists: 0
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fetchSummonerByName = this.fetchSummonerByName.bind(this)
    this.getChampionByID = this.getChampionByID.bind(this)
    this.getLatestChampionDDragon = this.getLatestChampionDDragon.bind(this)
    this.getChampionByKey = this.getChampionByKey.bind(this)
  }

  async getLatestChampionDDragon(language = 'en_US') {
    if (championJson[language]) return championJson[language]

    let response
    let versionIndex = 0
    do {
      // I loop over versions because 9.22.1 is broken
      const version = (await fetch(
        'http://ddragon.leagueoflegends.com/api/versions.json'
      ).then(async r => await r.json()))[versionIndex++]

      response = await fetch(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion.json`
      )
    } while (!response.ok)

    championJson[language] = await response.json()
    return championJson[language]
  }

  async getChampionByKey(key, language = 'en_US') {
    // Setup cache
    if (!championByIdCache[language]) {
      let json = await this.getLatestChampionDDragon(language)

      championByIdCache[language] = {}
      for (var championName in json.data) {
        if (!json.data.hasOwnProperty(championName)) continue

        const champInfo = json.data[championName]
        championByIdCache[language][champInfo.key] = champInfo
      }
    }

    return championByIdCache[language][key]
  }

  // NOTE: IN DDRAGON THE ID IS THE CLEAN NAME!!! It's also super-inconsistent, and broken at times.
  // Cho'gath => Chogath, Wukong => Monkeyking, Fiddlesticks => Fiddlesticks/FiddleSticks (depending on what mood DDragon is in this patch)
  async getChampionByID(name, language = 'en_US') {
    return await this.getLatestChampionDDragon(language)[name]
  }

  // async main() {
  //   const annie = await getChampionByKey(1, "en_US");
  //   const leona = await getChampionByKey(89, "es_ES");
  //   const brand = await getChampionByID("brand");

  //   console.log(annie);
  //   console.log(leona);
  //   console.log(brand);
  // }

  async fetchSummonerByName() {
    try {
      //Call API to get Summoner's Account ID
      let {data} = await axios.get('/api/search/summoner', {
        params: {username: this.state.value}
      })
      console.log('SUMMONER NAME DATA', data)

      this.setState({
        accId: data.accountId
      })
      //Call API to get Summoner's Game ID's
      let matches = await axios.get('/api/search/matches', {
        params: {accId: this.state.accId}
      })
      console.log('MATCHLIST DATA', matches)

      let startIdx = matches.data.startIndex
      this.setState({
        gameId: matches.data.matches[startIdx].gameId,
        champion: matches.data.matches[startIdx].champion
      })

      //Call API to get Summoner's Match Details
      let games = await axios.get('api/search/gameDetails', {
        params: {gameId: this.state.gameId}
      })
      console.log('GAME DETAILS 1', games)

      this.setState({
        gameMode: games.data.gameMode
      })

      //Get Summoner Team ID, K/D/A, ...
      for (let i = 0; i < games.data.participants.length; i++) {
        if (games.data.participants[i].championId === this.state.champion) {
          this.setState({
            teamId: games.data.participants[i].teamId,
            kills: games.data.participants[i].stats.kills,
            deaths: games.data.participants[i].stats.deaths,
            assists: games.data.participants[i].stats.assists
          })
        }
      }

      console.log("SUMMONER'S TEAM ID", this.state.teamId)

      //Get Match Outcome W/L
      for (let i = 0; i < games.data.teams.length; i++) {
        if (games.data.teams[i].teamId === this.state.teamId) {
          this.setState({
            teamOutcome: games.data.teams[i].win
          })
        }
      }

      //Get champion name
      let championInfo = await this.getChampionByKey(
        this.state.champion,
        'en_US'
      )
      console.log(championInfo)
      let championName = championInfo.id
      console.log(championName)

      this.setState({
        championName: championInfo.id
      })
    } catch (error) {
      console.log(error)
    }
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  handleSubmit(event) {
    this.fetchSummonerByName()
    event.preventDefault()
  }

  render() {
    // console.log('PROPS HERE', this.props)
    // console.log('STATE HERE', this.state)
    const imgsrc = `http://ddragon.leagueoflegends.com/cdn/11.6.1/img/champion/${
      this.state.championName
    }.png`

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Summoner Name
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
        <h1>{this.state.gameMode}</h1>
        <h1>{this.state.champion}</h1>
        <img src={imgsrc} />
        <h1>{this.state.teamOutcome}</h1>
        <h2>{this.state.kills}</h2>
        <h2>{this.state.deaths}</h2>
        <h2>{this.state.assists}</h2>
      </form>
    )
  }
}

export default SummonerPage
