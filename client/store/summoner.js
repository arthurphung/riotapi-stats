import axios from 'axios'
const FIND_SUMMONER = 'FIND_SUMMONER'
const FIND_SUMMONER_MATCH_LIST = 'FIND_SUMMONER_MATCH_LIST'
const GET_SUMMONER_MATCH_DETAILS = 'GET_SUMMONER_MATCH_DETAILS'
const GET_CHAMPION_BY_ID = 'GET_CHAMPION_BY_ID'
const GET_CHAMPION_BY_KEY = 'GET_CHAMPION_BY_KEY'
const GET_LATEST_CHAMPION_DDRAGON = 'GET_LATEST_CHAMPION_DDRAGON'
const ADD_PLAYER_BLOCK = 'ADD_PLAYER_BLOCK'
const GET_MATCH_DETAILS = 'GET_MATCH_DETAILS'

export const findSummoner = summoner => ({
  type: FIND_SUMMONER,
  summoner
})

export const findSummonerMatchList = accountId => ({
  type: FIND_SUMMONER_MATCH_LIST,
  accountId
})

export const getSummonerMatchDetails = gameId => ({
  type: GET_SUMMONER_MATCH_DETAILS,
  gameId
})

export const getChampionByID = champion => ({
  type: GET_CHAMPION_BY_ID,
  champion
})

export const getChampionByKey = champion => ({
  type: GET_CHAMPION_BY_KEY,
  champion
})

export const getLatestChampionDDragon = version => ({
  type: GET_LATEST_CHAMPION_DDRAGON,
  version
})

export const addPlayerBlock = details => ({
  type: ADD_PLAYER_BLOCK,
  details
})

export const getMatchDetails = details => ({
  type: GET_MATCH_DETAILS,
  details
})

export const fetchSummonerByName = summoner => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/search/summoner', summoner)
      // console.log(data)
      dispatch(findSummoner(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchMatchListByAccId = accountId => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/search/matches', accountId)
      // console.log(data)
      dispatch(findSummonerMatchList(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchMatchDetailsByGameId = gameId => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/search/gameDetails', gameId)
      // console.log(data)
      dispatch(getSummonerMatchDetails(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const createPlayerBlock = matchDetails => {
  return async dispatch => {
    try {
      const createdPlayerBlock = await axios.post(
        '/api/search/gameDetails',
        matchDetails
      )
      dispatch(addPlayerBlock(createdPlayerBlock))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchMatchDetails = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/search/matchDetails')
      // console.log(data)
      dispatch(getMatchDetails(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {
  accountNameData: [],
  accountMatchList: [],
  accountMatchDetails: [],
  matchDetailsBlock: [],
  matchSet: []
}

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function summonerReducer(state = initialState, action) {
  switch (action.type) {
    case FIND_SUMMONER: {
      return {...state, accountNameData: action.summoner}
    }
    case FIND_SUMMONER_MATCH_LIST: {
      return {...state, accountMatchList: action.accountId}
    }
    case GET_SUMMONER_MATCH_DETAILS: {
      return {...state, accountMatchDetails: action.gameId}
    }
    case ADD_PLAYER_BLOCK: {
      return {...state, matchDetailsBlock: action.details}
    }
    case GET_MATCH_DETAILS: {
      return {...state, matchSet: action.details}
    }
    default:
      return state
  }
}
