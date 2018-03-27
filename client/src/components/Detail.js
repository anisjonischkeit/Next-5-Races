import React, { Component } from 'react';
import { getRace } from '../api'

import Page404 from './404'

import { 
	Application, RacesContainer, Title, SubTitle, Para, 
	Table, TableData, BackButton
} from './styled-elements'

import countdown from 'countdown'

class App extends Component {
  state = {
    fetchState: "loading",
		race: null,
		timeUntilRace: undefined
  }

  async componentDidMount() {
		const race = await getRace(this.props.match.params.race_id)
		
		if (race !== null) {
			this.setUpRacesInState(race)
		} else {
			this.setState(state => ({
				race: null,
				fetchState: "success"
			}))
		}
	}

	setUpRacesInState = (race) => {
		this.setState(state => {

			// Set up initial countdown value
			const countD = countdown(new Date(race.closingTime))
		
			return {
				...state,
				timeUntilRace: (countD.value < -500 ? countD.toString() : null),
				race: race,
				fetchState: "success"
			}
			
		})

		// make countdown recalculate every second
		this.countdown = setInterval(() => {
			this.setState((state) => {
				const countD = countdown(new Date(race.closingTime))
				if (countD.value > -500) {
					clearInterval(this.countdown)
					return {
						...state,
						timeUntilRace: null
					}
				} else {
					return {
						...state,
						timeUntilRace: countD.toString()
					}
				}

			})
		}, 1000)
	}

  render() {
		const { race, fetchState, timeUntilRace } = this.state

		let countDownStr = ""
		if (timeUntilRace === null) {
			countDownStr = " Betting is closed"
		} else if (timeUntilRace === undefined) {
			countDownStr = ""
		} else {
			countDownStr = ` Betting Closes In ${timeUntilRace}`
		}

		if (race !== null) {
			return (
				<Application>
					<Title>{race.meeting.name}</Title>
					<RacesContainer>
						<SubTitle>{ countDownStr }</SubTitle>
						<h2>Meeting : </h2>
						<Para>{race.meeting.name}</Para>
						<h2>Race Type : </h2>
						<Para> {race.type}</Para>
						<h2>Betting Closing Time : </h2>
						<Para> {String(new Date(race.closingTime))}</Para>
						<h2>Competitors : </h2>
						<Table>
							<tr>
								<TableData><h3>Position Number</h3></TableData>
								<TableData><h3>Competitor Name</h3></TableData>
							</tr>
							{race.competitors.map(competitor => (
								<tr>
									<TableData>{competitor.positionNo}</TableData>
									<TableData>{competitor.name}</TableData>
								</tr>
							))}
						</Table>
					</RacesContainer>
					<SubTitle><BackButton href="/">&lt; See More Races</BackButton></SubTitle>
				</Application>
			);
		} else if (fetchState === "loading") {
			return null // <p>loading</p>
		} else {
			return <Page404 />
		}
  }
}

export default App;
