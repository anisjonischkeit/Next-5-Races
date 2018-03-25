from flask import Flask, jsonify
from flask_graphql import GraphQLView
# from races import race_list, to_json_race_list
from graphql_schema import schema

app = Flask(__name__)

app.add_url_rule(
    '/api/v1/races/graphql',
    view_func=GraphQLView.as_view(
        'graphql',
        schema=schema,
        graphiql=True # for having the GraphiQL interface
    )
)

if __name__ == "__main__":
		app.run("0.0.0.0", 8001)