import graphene
from graphene.types.datetime import DateTime

class Competitor(graphene.ObjectType):
		name = graphene.String()
		position_no = graphene.Int()		

class Race(graphene.ObjectType):
		id = graphene.String()
		closing_time = DateTime()
		type = graphene.String()
		competitors = graphene.List(Competitor)
