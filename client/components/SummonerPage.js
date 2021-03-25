import axios from 'axios'
import React from 'react'
import {connect} from 'react-redux'
// import fetchSummonerByName from '../store/summoner'

export class SummonerPage extends React.Component {
  constructor() {
    super()
    this.state = {
      value: '',
      accId: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fetchSummonerByName = this.fetchSummonerByName.bind(this)
  }

  // componentDidMount() {
  //     this.props.loadSummonerByName()
  // }

  async fetchSummonerByName(event) {
    this.setState({
      value: event.target.value
    })
    try {
      let {data} = await axios.get('/api/search/summoner')
      console.log(data)
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
    event.preventDefault()
  }

  render() {
    console.log('PROPS HERE', this.props)
    console.log('STATE HERE', this.state)
    console.log(this.props.loadSummonerByName)
    return (
      <form>
        <label>
          Summoner Name
          <input
            type="text"
            value={this.state.value}
            onChange={this.fetchSummonerByName}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
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
    loadSummonerByName: () => {
      dispatch(fetchSummonerByName())
    }
  }
}

export default connect(mapState, mapDispatch)(SummonerPage)
