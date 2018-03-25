import graphene

from race_faker import create_fake_race
from graphql_types import Race

race_list = [
		create_fake_race() 
		for _ in range(0, 201)
]

class Query(graphene.ObjectType):
		races = graphene.List(Race, limit=graphene.Int())

		def resolve_races(self, info, limit):
				return sorted(race_list, key=lambda x: x.closing_time)[:limit]

schema = graphene.Schema(query=Query)