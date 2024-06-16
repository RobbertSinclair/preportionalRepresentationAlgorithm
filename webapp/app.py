from flask import Flask, request, Response
from voting_systems.voting_system import VotingSystems

app = Flask(__name__)

@app.route("/")
def hello():
    return "<h1>Hello World</h1>"

@app.route("/dhondt", methods=["POST"])
def dhondt_data():
    data = request.get_json()
    app.logger.info(data)
    return {"Labour": 10, "Conservative": 15}

@app.route("/preportional", methods=["POST"])
def preportionalRepresentation():
    data = request.get_json()
    try:
        results = data["results"]
        total_seats = data["total_seats"]
        app.logger.info(data)
        results = VotingSystems.party_proportional(results, total_seats)
        return results
    except Exception as e:
        app.logger.exception(e)
        return {"ERROR": "Invalid Data Received"}, 400


if __name__ == "__main__":
    app.run(debug=True, port=5000)