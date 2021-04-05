import React from 'react'
import {connect} from 'react-redux'
import {fetchUserDetails} from '../store/summoner'

import {Container, Row, Col, Button, Image} from 'react-bootstrap'

class SummonerInfoBox extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: 10
    }
    this.showMoreMatches = this.showMoreMatches.bind(this)
  }

  componentDidMount() {
    this.props.loadUserMatchSet(this.props.match.params.summonerId)
  }

  showMoreMatches() {
    this.setState(prevState => ({
      visible: prevState.visible + 10
    }))
  }

  render() {
    const matchSet = this.props.summonerData.userMatchSet
    console.log(matchSet, 'MATCHSET DATA')

    return (
      <div>
        <Container>
          <Row className="m-2">
            <Col sm={1}>
              <Row className="summonerName justify-content-center">
                {matchSet[0] !== undefined && matchSet[0].summonerName}
              </Row>
              <Row className="profileIcon justify-content-center">
                {matchSet[0] !== undefined && (
                  <Image
                    src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/profileicon/${
                      matchSet[0].profileIconId
                    }.png`}
                    rounded
                  />
                )}
              </Row>
            </Col>
          </Row>
          {matchSet.slice(0, this.state.visible).map(match => (
            <Row key={match.id} className="m-2 border border-white">
              <Col sm={1} className="align-self-center">
                <Row className="justify-content-center">{match.gameMode}</Row>
                <Row className="justify-content-center">
                  {match.teamOutcome === 'Fail' ? 'Defeat' : 'Victory'}
                </Row>
              </Col>
              <Col sm={2} className="align-self-center">
                <Row className="justify-content-center">
                  <Col sm={6}>
                    <Row className="justify-content-end championPicture">
                      <img
                        src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion/${
                          match.championName
                        }.png`}
                      />
                    </Row>
                  </Col>
                  <Col sm={6}>
                    <Row>
                      <img
                        src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/spell/${
                          match.spell1
                        }.png`}
                      />
                    </Row>
                    <Row>
                      <img
                        src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/spell/${
                          match.spell2
                        }.png`}
                      />
                    </Row>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  {match.championName}
                </Row>
              </Col>
              <Col sm={1} className="align-self-center">{`${match.kills}/${
                match.deaths
              }/${match.assists}`}</Col>
              <Col sm={4} className="align-self-center">
                <Row>
                  <Col>
                    <Row className="justify-content-sm-end">
                      <img
                        src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/${
                          match.item0
                        }.png`}
                      />
                      <img
                        src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/${
                          match.item1
                        }.png`}
                      />
                      <img
                        src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/${
                          match.item2
                        }.png`}
                      />
                    </Row>
                    <Row className="justify-content-sm-end">
                      <img
                        src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/${
                          match.item3
                        }.png`}
                      />
                      <img
                        src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/${
                          match.item4
                        }.png`}
                      />
                      <img
                        src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/${
                          match.item5
                        }.png`}
                      />
                    </Row>
                  </Col>
                  <Col className="align-self-center">
                    <Row>
                      <img
                        src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/${
                          match.item6
                        }.png`}
                      />
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col sm={2} className="align-self-center">
                <Row>{match.teammate1}</Row>
                <Row>{match.teammate2}</Row>
                <Row>{match.teammate3}</Row>
                <Row>{match.teammate4}</Row>
                <Row>{match.teammate5}</Row>
              </Col>
              <Col sm={2} className="align-self-center">
                <Row>{match.opponent1}</Row>
                <Row>{match.opponent2}</Row>
                <Row>{match.opponent3}</Row>
                <Row>{match.opponent4}</Row>
                <Row>{match.opponent5}</Row>
              </Col>
            </Row>
          ))}
          <Row className="justify-content-center">
            <Button onClick={this.showMoreMatches}>Load More</Button>
          </Row>
        </Container>
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
    loadUserMatchSet: summonerId => dispatch(fetchUserDetails(summonerId))
  }
}

export default connect(mapState, mapDispatch)(SummonerInfoBox)
