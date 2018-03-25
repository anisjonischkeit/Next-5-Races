from faker import Faker
from random import randint
from graphql_types import Race, Competitor
import datetime
from uuid import uuid4

fake = Faker('it_IT')

dog_types = ["Thoroughbred", "Greyhound", "Harness"]

def create_fake_competitors():
		return [ 
				Competitor(name=fake.name(), position_no=pos) 
				for pos in range(1, 11)
		]

# we have to pass in the Race and Competitor class
# to avoid a circular import 
def create_fake_race():

		# Time in minutes between 1 min and 7 days
		time_offset = randint(1, 7 * 24 * 60)
		now = datetime.datetime.utcnow()
		closing_time = now + datetime.timedelta(minutes = time_offset)

		# A random dog type
		dog_type = dog_types[randint(0, 2)]

		# generate a random race uuid
		id = str(uuid4())

		return Race(id=id, closing_time=closing_time, type=dog_type, competitors=create_fake_competitors())
