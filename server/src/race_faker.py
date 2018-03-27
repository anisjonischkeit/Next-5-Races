from faker import Faker
from random import randint
import pytz
from graphql_types import Race, Competitor, Meeting
import datetime
from uuid import uuid4

competitor_name_faker = Faker('it_IT').name
meeting_name_faker = Faker('en_AU').city

dog_types = ["Thoroughbred", "Greyhound", "Harness"]

def create_fake_meeting():
		return Meeting(id=str(uuid4()), name=meeting_name_faker()) 

def create_fake_competitors():
		return [ 
				Competitor(id=str(uuid4()), name=competitor_name_faker(), position_no=pos) 
				for pos in range(1, 11)
		]

# we have to pass in the Race and Competitor class
# to avoid a circular import 
def create_fake_race():

		# Time in minutes between 1 min and 7 days
		time_offset = randint(1, 7 * 24 * 60)
		now = datetime.datetime.utcnow()
		closing_time = now + datetime.timedelta(minutes = time_offset)

		# make timezone aware
		aware_closing_time = closing_time.replace(tzinfo=pytz.UTC)

		# A random dog type
		dog_type = dog_types[randint(0, 2)]

		# generate a random race uuid
		id = str(uuid4())

		return Race(
				id=id,
				closing_time=aware_closing_time,
				type=dog_type, 
				competitors=create_fake_competitors(), 
				meeting=create_fake_meeting()
		)
