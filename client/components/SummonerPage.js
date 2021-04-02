import React from 'react'
import {connect} from 'react-redux'

import {
  fetchSummonerByName,
  fetchMatchListByAccId,
  fetchMatchDetailsByGameId,
  createPlayerBlock,
  createMatchTeammates,
  createSummonerName
} from '../store/summoner'

import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

let championByIdCache = {}
let championJson = {}
let spellByIdCache = []
let spellJson = []

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
      champLevel: '',
      matchDetails: '',
      spell1: '',
      spell2: '',
      item0: '',
      item1: '',
      item2: '',
      item3: '',
      item4: '',
      item5: '',
      item6: '',
      reducedTeamArr: '',
      reducedOppArr: '',
      teammate1: '',
      teammate2: '',
      teammate3: '',
      teammate4: '',
      teammate5: '',
      opponent1: '',
      opponent2: '',
      opponent3: '',
      opponent4: '',
      opponent5: '',
      summonerName: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.search = this.search.bind(this)
    this.getLatestChampionDDragon = this.getLatestChampionDDragon.bind(this)
    this.getChampionByKey = this.getChampionByKey.bind(this)
    this.getMatchDetails = this.getMatchDetails.bind(this)
    this.getMatchList = this.getMatchList.bind(this)
    this.getMatchOutcome = this.getMatchOutcome.bind(this)
    this.getSummoner = this.getSummoner.bind(this)
    this.getChampionName = this.getChampionName.bind(this)
    this.createSummonerBox = this.createSummonerBox.bind(this)
    this.getSummonerSpells = this.getSummonerSpells.bind(this)
    this.getItems = this.getItems.bind(this)
    this.getTeams = this.getTeams.bind(this)
    this.getTeammates = this.getTeammates.bind(this)
    this.getOpponents = this.getOpponents.bind(this)
    this.getLatestSummonerSpellsDDragon = this.getLatestSummonerSpellsDDragon.bind(
      this
    )
    this.getSummonerSpellByKey = this.getSummonerSpellByKey.bind(this)
    this.createSummonerNameList = this.createSummonerNameList.bind(this)
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

  async getLatestSummonerSpellsDDragon(language = 'en_US') {
    if (spellJson[language]) return spellJson[language]

    let response
    let versionIndex = 0
    do {
      // I loop over versions because 9.22.1 is broken
      const version = (await fetch(
        'http://ddragon.leagueoflegends.com/api/versions.json'
      ).then(async r => await r.json()))[versionIndex++]

      response = await fetch(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/summoner.json`
      )
    } while (!response.ok)

    spellJson[language] = await response.json()
    return spellJson[language]
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
      console.log(championByIdCache, 'CHAMP CACHE')
    }

    return championByIdCache[language][key]
  }

  async getSummonerSpellByKey(key, language = 'en_US') {
    // Setup cache
    if (!spellByIdCache[language]) {
      let json = await this.getLatestSummonerSpellsDDragon(language)

      spellByIdCache[language] = {}
      for (var spellName in json.data) {
        if (!json.data.hasOwnProperty(spellName)) continue

        const spellInfo = json.data[spellName]
        spellByIdCache[language][spellInfo.key] = spellInfo
      }
      console.log(spellByIdCache, 'SPELL CACHE')
    }

    return spellByIdCache[language][key]
  }

  // NOTE: IN DDRAGON THE ID IS THE CLEAN NAME!!! It's also super-inconsistent, and broken at times.
  // Cho'gath => Chogath, Wukong => Monkeyking, Fiddlesticks => Fiddlesticks/FiddleSticks (depending on what mood DDragon is in this patch)
  // async getChampionByID(name, language = 'en_US') {
  //   return await this.getLatestChampionDDragon(language)[name]
  // }

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
      accountId: this.props.summonerData.accountNameData.accountId,
      summonerName: this.props.summonerData.accountNameData.name
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
      for (let i = 0; i < 40; i++) {
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
      let championLevelArray = []
      let participantIdArray = []

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
            championLevelArray.push(
              this.state.matchDetails[i].participants[j].stats.champLevel
            )
            participantIdArray.push(
              this.state.matchDetails[i].participants[j].participantId
            )
          }
        }
      }

      this.setState({
        gameMode: gameModesArray,
        teamId: teamIdArray,
        kills: killsArray,
        deaths: deathsArray,
        assists: assistsArray,
        champLevel: championLevelArray,
        participantId: participantIdArray
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getSummonerSpells() {
    try {
      let spell1Array = []
      let spell2Array = []

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
            spell1Array.push(
              this.state.matchDetails[i].participants[j].spell1Id
            )
            spell2Array.push(
              this.state.matchDetails[i].participants[j].spell2Id
            )
          }
        }
      }

      let spell1NameArr = []
      let spell2NameArr = []

      for (let i = 0; i < spell1Array.length; i++) {
        let spell1Info = await this.getSummonerSpellByKey(
          spell1Array[i],
          'en_US'
        )

        let spell2Info = await this.getSummonerSpellByKey(
          spell2Array[i],
          'en_US'
        )
        spell1NameArr.push(spell1Info.id)
        spell2NameArr.push(spell2Info.id)
      }

      this.setState({
        spell1: spell1NameArr,
        spell2: spell2NameArr
      })
    } catch (error) {
      console.log(error)
    }
  }

  getItems() {
    try {
      let item0Arr = []
      let item1Arr = []
      let item2Arr = []
      let item3Arr = []
      let item4Arr = []
      let item5Arr = []
      let item6Arr = []

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
            item0Arr.push(
              this.state.matchDetails[i].participants[j].stats.item0
            )
            item1Arr.push(
              this.state.matchDetails[i].participants[j].stats.item1
            )
            item2Arr.push(
              this.state.matchDetails[i].participants[j].stats.item2
            )
            item3Arr.push(
              this.state.matchDetails[i].participants[j].stats.item3
            )
            item4Arr.push(
              this.state.matchDetails[i].participants[j].stats.item4
            )
            item5Arr.push(
              this.state.matchDetails[i].participants[j].stats.item5
            )
            item6Arr.push(
              this.state.matchDetails[i].participants[j].stats.item6
            )
          }
        }
      }

      this.setState({
        item0: item0Arr,
        item1: item1Arr,
        item2: item2Arr,
        item3: item3Arr,
        item4: item4Arr,
        item5: item5Arr,
        item6: item6Arr
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

  getTeams() {
    try {
      let teammatesArr = []
      let opponentsArr = []

      for (let i = 0; i < this.state.matchDetails.length; i++) {
        for (
          let j = 0;
          j < this.state.matchDetails[i].participants.length;
          j++
        ) {
          if (
            this.state.matchDetails[i].participants[j].teamId ===
            this.state.teamId[i]
          ) {
            teammatesArr.push(
              this.state.matchDetails[i].participantIdentities[j].player
                .summonerName
            )
          } else {
            opponentsArr.push(
              this.state.matchDetails[i].participantIdentities[j].player
                .summonerName
            )
          }
        }
      }

      let reducedTeamArr = []
      let reducedOppArr = []
      let size = 5

      for (let i = 0; i < teammatesArr.length; i += size) {
        reducedTeamArr.push(teammatesArr.slice(i, i + size))
        reducedOppArr.push(opponentsArr.slice(i, i + size))
      }

      // for (let i = 0; i < teammatesArr.length; i++) {
      //   this.props.createMatchTeammates({
      //     teammatesId: teammatesArr[i],
      //     opponentsId: opponentsArr[i]
      //   })
      // }

      this.setState({
        reducedTeamArr: reducedTeamArr,
        reducedOppArr: reducedOppArr
      })
    } catch (error) {
      console.log(error)
    }
  }

  getTeammates() {
    try {
      this.setState({
        teammate1: this.state.reducedTeamArr.map(match => match[0]),
        teammate2: this.state.reducedTeamArr.map(match => match[1]),
        teammate3: this.state.reducedTeamArr.map(match => match[2]),
        teammate4: this.state.reducedTeamArr.map(match => match[3]),
        teammate5: this.state.reducedTeamArr.map(match => match[4])
      })
    } catch (error) {
      console.log(error)
    }
  }

  getOpponents() {
    try {
      this.setState({
        opponent1: this.state.reducedOppArr.map(match => match[0]),
        opponent2: this.state.reducedOppArr.map(match => match[1]),
        opponent3: this.state.reducedOppArr.map(match => match[2]),
        opponent4: this.state.reducedOppArr.map(match => match[3]),
        opponent5: this.state.reducedOppArr.map(match => match[4])
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
      for (let i = 0; i < 40; i++) {
        await this.props.createPlayerBlock({
          gameMode: this.state.gameMode[i],
          championName: this.state.championName[i],
          teamOutcome: this.state.teamOutcome[i],
          kills: this.state.kills[i],
          deaths: this.state.deaths[i],
          assists: this.state.assists[i],
          gameId: this.state.gameId[i],
          champLevel: this.state.champLevel[i],
          spell1: this.state.spell1[i],
          spell2: this.state.spell2[i],
          item0: this.state.item0[i],
          item1: this.state.item1[i],
          item2: this.state.item2[i],
          item3: this.state.item3[i],
          item4: this.state.item4[i],
          item5: this.state.item5[i],
          item6: this.state.item6[i],
          teammate1: this.state.teammate1[i],
          teammate2: this.state.teammate2[i],
          teammate3: this.state.teammate3[i],
          teammate4: this.state.teammate4[i],
          teammate5: this.state.teammate5[i],
          opponent1: this.state.opponent1[i],
          opponent2: this.state.opponent2[i],
          opponent3: this.state.opponent3[i],
          opponent4: this.state.opponent4[i],
          opponent5: this.state.opponent5[i],
          summonerName: this.state.summonerName
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  async createSummonerNameList() {
    try {
      await this.props.createSummonerName({
        summonerId: this.state.summonerName
      })
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
      await this.getSummonerSpells()
      await this.getItems()
      await this.getTeams()
      await this.getTeammates()
      await this.getOpponents()
      await this.createSummonerBox()
      await this.createSummonerNameList()

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
        <InputGroup className="mt-3 w-50">
          <FormControl
            placeholder="Summoner's username"
            aria-label="Summoner's username"
            aria-describedby="basic-addon2"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={this.handleSubmit}>
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
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
    createPlayerBlock: details => dispatch(createPlayerBlock(details)),
    createMatchTeammates: ids => dispatch(createMatchTeammates(ids)),
    createSummonerName: id => dispatch(createSummonerName(id))
  }
}

export default connect(mapState, mapDispatch)(SummonerPage)
