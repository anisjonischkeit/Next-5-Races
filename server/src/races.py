from faker import Faker
from random import randint
import datetime
from uuid import uuid4

fake = Faker('it_IT')

dog_types = ["Thoroughbred", "Greyhound", "Harness"]

class Competitor(object):
		def __init__(self, name, position_no):
				self.name = name
				self.position_no = position_no

		def to_json(self):
				return self.__dict__

def create_fake_competitors():
		return [ Competitor(fake.name(), pos) for pos in range(1, 11) ]

class Race(object):
		def __init__(self, id, closing_time, dog_type, competitors):
				self.id = id
				self.closing_time = closing_time
				self.dog_type = dog_type
				self.competitors = competitors

		def to_json(self):
				return {
					"id" : self.id,
					"closing_time" : self.closing_time.isoformat(),
					"dog_type" : self.dog_type,
					"competitors" : [ competitor.to_json() for competitor in  self.competitors ]
				}
		

def create_fake_race():

		# Time in minutes between 1 min and 7 days
		time_offset = randint(1, 7 * 24 * 60)
		now = datetime.datetime.utcnow()
		closing_time = now + datetime.timedelta(minutes = time_offset)

		# A random dog type
		dog_type = dog_types[randint(0, 2)]

		# generate a random race uuid
		id = str(uuid4())

		return Race(id, closing_time, dog_type, create_fake_competitors())

def to_json_race_list(race_list):
		return [race.to_json() for race in race_list]

race_list = [create_fake_race() for _ in range(0, 201)]