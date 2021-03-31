import React from 'react'
import {connect} from 'react-redux'
import {fetchMatchDetails, fetchMatchTeams} from '../store/summoner'

import {Container} from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'

class SummonerInfoBox extends React.Component {
  componentDidMount() {
    this.props.loadMatchSet()
  }

  render() {
    const matchSet = this.props.summonerData.matchSet
    console.log(matchSet, 'MATCHSET DATA')

    return (
      <div className="root">
        <Container>
          {matchSet.map(match => (
            <Row key={match.id} className="m-5">
              <ListGroup horizontal>
                <ListGroup.Item>
                  <Col>
                    <Row>{match.gameMode}</Row>
                    <Row>{match.teamOutcome}</Row>
                  </Col>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Image
                    src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion/${
                      match.championName
                    }.png`}
                    rounded
                  />
                </ListGroup.Item>
                <ListGroup.Item>{`${match.kills}/${match.deaths}/${
                  match.assists
                }`}</ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col sm>
                      <Image
                        src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/${
                          match.item0
                        }.png`}
                        rounded
                      />
                      <Image
                        src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/${
                          match.item1
                        }.png`}
                        rounded
                      />
                      <Image
                        src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/${
                          match.item2
                        }.png`}
                        rounded
                      />
                      <Image
                        src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/${
                          match.item3
                        }.png`}
                        rounded
                      />
                      <Image
                        src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/${
                          match.item4
                        }.png`}
                        rounded
                      />
                      <Image
                        src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/${
                          match.item5
                        }.png`}
                        rounded
                      />
                    </Col>
                    <Col sm>
                      <Image
                        src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/${
                          match.item6
                        }.png`}
                        rounded
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Col xs={6}>
                    <Row>{match.teammate1}</Row>
                    <Row>{match.teammate2}</Row>
                    <Row>{match.teammate3}</Row>
                    <Row>{match.teammate4}</Row>
                    <Row>{match.teammate5}</Row>
                  </Col>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Col xs={6}>
                    <Row>{match.opponent1}</Row>
                    <Row>{match.opponent2}</Row>
                    <Row>{match.opponent3}</Row>
                    <Row>{match.opponent4}</Row>
                    <Row>{match.opponent5}</Row>
                  </Col>
                </ListGroup.Item>
              </ListGroup>
            </Row>
            //
            // <Row key={match.id} className="m-5">
            //   <Col>
            //     <Row>{match.gameMode}</Row>
            //     <Row>{match.teamOutcome}</Row>
            //   </Col>
            //   <Col>
            //     <img
            //       src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion/${
            //         match.championName
            //       }.png`}
            //     />
            //   </Col>
            //   <Col>{`${match.kills}/${match.deaths}/${match.assists}`}</Col>
            //   <Col sm={2}>
            //     <Row>
            //       <img
            //         src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/${
            //           match.item0
            //         }.png`}
            //       />
            //       <img
            //         src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/${
            //           match.item1
            //         }.png`}
            //       />
            //       <img
            //         src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/${
            //           match.item2
            //         }.png`}
            //       />
            //       <img
            //         src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/${
            //           match.item3
            //         }.png`}
            //       />
            //       <img
            //         src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/${
            //           match.item4
            //         }.png`}
            //       />
            //       <img
            //         src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/${
            //           match.item5
            //         }.png`}
            //       />
            //       <img
            //         src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/${
            //           match.item6
            //         }.png`}
            //       />
            //     </Row>
            //   </Col>
            //   <Col>
            //     <Row>{match.teammate1}</Row>
            //     <Row>{match.teammate2}</Row>
            //     <Row>{match.teammate3}</Row>
            //     <Row>{match.teammate4}</Row>
            //     <Row>{match.teammate5}</Row>
            //   </Col>
            //   <Col>
            //     <Row>{match.opponent1}</Row>
            //     <Row>{match.opponent2}</Row>
            //     <Row>{match.opponent3}</Row>
            //     <Row>{match.opponent4}</Row>
            //     <Row>{match.opponent5}</Row>
            //   </Col>
            // </Row>
          ))}
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
    loadMatchSet: () => dispatch(fetchMatchDetails())
  }
}

export default connect(mapState, mapDispatch)(SummonerInfoBox)
