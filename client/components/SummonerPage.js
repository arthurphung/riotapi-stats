import axios from 'axios'
import React from 'react'

export class SummonerPage extends React.Component {
  constructor() {
    super()
    this.state = {
      value: '',
      accId: '',
      gameId: '',
      champion: 0,
      gameMode: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fetchSummonerByName = this.fetchSummonerByName.bind(this)
  }

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
        champion: this.state.champion + matches.data.matches[startIdx].champion
      })

      //Call API to get Summoner's Match Details
      let games = await axios.get('api/search/gameDetails', {
        params: {gameId: this.state.gameId}
      })
      console.log('GAME DETAILS 1', games)

      this.setState({
        gameMode: games.data.gameMode
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
      </form>
    )
  }
}

export default SummonerPage
