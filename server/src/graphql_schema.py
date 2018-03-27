import graphene

from race_faker import create_fake_race
import pytz
from graphql_types import Race
from datetime import datetime

race_list = [
		create_fake_race() 
		for _ in range(0, 50000)
]

race_list = sorted(race_list, key=lambda x: x.closing_time)

class Query(graphene.ObjectType):
		races = graphene.List(Race, limit=graphene.Int(required=True), only_open_races=graphene.Boolean())
		def resolve_races(self, info, limit, only_open_races=False):
				return_list = race_list
				if only_open_races:
						now = datetime.utcnow().replace(tzinfo=pytz.UTC)
						return_list = list(filter(lambda race: race.closing_time > now, race_list))
				
				return return_list[:limit]

		race = graphene.Field(Race, id=graphene.String(required=True))
		def resolve_race(self, info, id):
				return next(filter(lambda race: race.id == id, race_list), None)

schema = graphene.Schema(query=Query)