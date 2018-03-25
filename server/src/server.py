from flask import Flask, jsonify
from races import race_list, to_json_race_list
import pickle

app = Flask(__name__)


@app.route("/api/v1/races")
def get_races():
		json_races = to_json_race_list(race_list)
		return jsonify(races=json_races)

if __name__ == "__main__":
		app.run("0.0.0.0", 8001)