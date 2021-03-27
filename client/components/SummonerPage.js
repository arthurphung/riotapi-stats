import React from 'react'
import {connect} from 'react-redux'

import {
  fetchSummonerByName,
  fetchMatchListByAccId,
  fetchMatchDetailsByGameId,
  createPlayerBlock
} from '../store/summoner'

let championByIdCache = {}
let championJson = {}

export class SummonerPage extends React.Component {
  constructor() {
    super()
    this.state = {
      value: '',
      accountId: '',
      gameId: '',
      champion: '',
      gameMode: '',
      championName: '',
      teamId: '',
      teamOutcome: '',
      kills: '',
      deaths: '',
      assists: '',
      matchDetails: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.search = this.search.bind(this)
    this.getChampionByID = this.getChampionByID.bind(this)
    this.getLatestChampionDDragon = this.getLatestChampionDDragon.bind(this)
    this.getChampionByKey = this.getChampionByKey.bind(this)
    this.getMatchDetails = this.getMatchDetails.bind(this)
    this.getMatchList = this.getMatchList.bind(this)
    this.getMatchOutcome = this.getMatchOutcome.bind(this)
    this.getSummoner = this.getSummoner.bind(this)
    this.getChampionName = this.getChampionName.bind(this)
    this.createSummonerBox = this.createSummonerBox.bind(this)
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

  async getSummoner() {
    await this.props.fetchSummonerByName({
      params: {username: this.state.value}
    })
    console.log('SUMMONER NAME DATA', this.props.summonerData.accountNameData)

    this.setState({
      accountId: this.props.summonerData.accountNameData.accountId
    })
  }

  async getMatchList() {
    try {
      await this.props.fetchMatchListByAccId({
        params: {accountId: this.state.accountId}
      })
      console.log(
        'SUMMONER MATCH LIST DATA',
        this.props.summonerData.accountMatchList
      )

      //Storing first 10 matches
      let matchArray = []
      let championArray = []
      for (let i = 0; i < 10; i++) {
        matchArray.push(
          this.props.summonerData.accountMatchList.matches[i].gameId
        )
        championArray.push(
          this.props.summonerData.accountMatchList.matches[i].champion
        )
      }
      this.setState({
        gameId: matchArray,
        champion: championArray
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getMatchDetails() {
    try {
      let matchDetailsArray = []
      let gameModesArray = []
      let teamIdArray = []
      let killsArray = []
      let deathsArray = []
      let assistsArray = []

      for (let i = 0; i < this.state.gameId.length; i++) {
        await this.props.fetchMatchDetailsByGameId({
          params: {gameId: this.state.gameId[i]}
        })

        matchDetailsArray.push(this.props.summonerData.accountMatchDetails)
        this.setState({
          matchDetails: matchDetailsArray
        })

        gameModesArray.push(
          this.props.summonerData.accountMatchDetails.gameMode
        )
      }

      //Get Summoner Team ID, K/D/A, ...
      for (let i = 0; i < this.state.matchDetails.length; i++) {
        for (
          let j = 0;
          j < this.state.matchDetails[i].participants.length;
          j++
        ) {
          if (
            this.state.matchDetails[i].participants[j].championId ===
            this.state.champion[i]
          ) {
            teamIdArray.push(this.state.matchDetails[i].participants[j].teamId)
            killsArray.push(
              this.state.matchDetails[i].participants[j].stats.kills
            )
            deathsArray.push(
              this.state.matchDetails[i].participants[j].stats.deaths
            )
            assistsArray.push(
              this.state.matchDetails[i].participants[j].stats.assists
            )
          }
        }
      }

      this.setState({
        gameMode: gameModesArray,
        teamId: teamIdArray,
        kills: killsArray,
        deaths: deathsArray,
        assists: assistsArray
      })
    } catch (error) {
      console.log(error)
    }
  }

  getMatchOutcome() {
    try {
      let matchOutcomeArr = []
      //Get Match Outcome W/L
      for (let i = 0; i < this.state.matchDetails.length; i++) {
        for (let j = 0; j < this.state.matchDetails[i].teams.length; j++) {
          if (
            this.state.matchDetails[i].teams[j].teamId === this.state.teamId[i]
          ) {
            matchOutcomeArr.push(this.state.matchDetails[i].teams[j].win)
          }
        }
      }

      this.setState({
        teamOutcome: matchOutcomeArr
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getChampionName() {
    try {
      //Get champion name
      let championNameArr = []
      for (let i = 0; i < this.state.champion.length; i++) {
        let championInfo = await this.getChampionByKey(
          this.state.champion[i],
          'en_US'
        )
        // console.log(championInfo)
        championNameArr.push(championInfo.id)
      }

      this.setState({
        championName: championNameArr
      })
    } catch (error) {
      console.log(error)
    }
  }

  async createSummonerBox() {
    try {
      for (let i = 0; i < 10; i++) {
        await this.props.createPlayerBlock({
          gameMode: this.state.gameMode[i],
          championName: this.state.championName[i],
          teamOutcome: this.state.teamOutcome[i],
          kills: this.state.kills[i],
          deaths: this.state.deaths[i],
          assists: this.state.assists[i],
          gameId: this.state.gameId[i]
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  async search() {
    try {
      await this.getSummoner()
      await this.getMatchList()
      await this.getMatchDetails()
      await this.getMatchOutcome()
      await this.getChampionName()
      await this.createSummonerBox()

      console.log(this.props.summonerData)
      console.log(this.state)
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
    this.search()
    event.preventDefault()
  }

  render() {
    return (
      <div>
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
        </form>

        {/* <SummonerInfoBox /> */}
      </div>
    )
  }
}

const mapState = state => {
  return {
    summonerData: state.summoner
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSummonerByName: summoner => dispatch(fetchSummonerByName(summoner)),
    fetchMatchListByAccId: accountId =>
      dispatch(fetchMatchListByAccId(accountId)),
    fetchMatchDetailsByGameId: gameId =>
      dispatch(fetchMatchDetailsByGameId(gameId)),
    createPlayerBlock: details => dispatch(createPlayerBlock(details))
  }
}

export default connect(mapState, mapDispatch)(SummonerPage)
