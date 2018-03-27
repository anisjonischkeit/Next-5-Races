import graphene
from graphene.types.datetime import DateTime

class Meeting(graphene.ObjectType):
		id = graphene.String()
		name = graphene.String()

class Competitor(graphene.ObjectType):
		id = graphene.String()
		name = graphene.String()
		position_no = graphene.Int()		

class Race(graphene.ObjectType):
		id = graphene.String()
		meeting = graphene.Field(Meeting)
		closing_time = DateTime()
		type = graphene.String()
		competitors = graphene.List(Competitor)
