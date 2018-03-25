import graphene

from race_faker import create_fake_race
from graphql_types import Race

race_list = [
		create_fake_race() 
		for _ in range(0, 201)
]

class Query(graphene.ObjectType):
		races = graphene.List(Race)

		def resolve_races(self, info):
				return race_list

schema = graphene.Schema(query=Query)