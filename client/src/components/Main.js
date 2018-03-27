import React, { Component } from 'react';
import { getRaces } from '../api'

import RaceItem from './RaceItem'
import { getRaceWithTimeUntil } from "../utils"

import { Application, RacesContainer, Title } from './styled-elements'

const racesBuffer = 20

const racesWithTimeUntil = races => (
  races.map(getRaceWithTimeUntil).filter(race => race !== null)
)

class App extends Component {
  state = {
    initialFetchState: "loading",
    races: []
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.initialFetchState === "success" && this.state.races.length <= racesBuffer/2) {
      this.getLatestRaces()
    }
  }

  componentDidMount() {
    this.getLatestRaces()

    setInterval(() => {
      this.setState((state) => ({
        ...state,
        races: racesWithTimeUntil(state.races)
      }))
    }, 1000)
  }

  async getLatestRaces() {
    const races = await getRaces(racesBuffer)
    
    this.setState(state => ({
      races: racesWithTimeUntil(races),
      initialFetchState: "success"
    }))
  }

  render() {
    const { races, initialFetchState } = this.state
    return (
      <Application>
        <Title>Next 5 Races</Title>
        <RacesContainer>
          { initialFetchState === "loading" && <p>loading</p> }
          { initialFetchState === "success" &&
              races.slice(0, 5).map(race => (
                <RaceItem
                  key={race.id} 
                  closingTime={race.timeUntil} 
                  title={race.meeting.name}
                  link={`/races/${race.id}`}
                />
              ))
          }
        </RacesContainer>
      </Application>
    );
  }
}

export default App;
