import countdown from 'countdown'

// adds a timeUntil fields to a race. This is a Human readable
// string of how long until the race closes
export const getRaceWithTimeUntil = race => {
	const closingTime = new Date(race.closingTime)
	const countdownTimeSpan = countdown(closingTime)

	if (countdownTimeSpan.value >= -500) {
		return null
	} else {
		// dont manipulate the state
		const newRace = { ...race }

		newRace["timeUntil"] = countdownTimeSpan.toString()
		return newRace
	}
}