from flask import Flask, request, Response
from voting_systems.voting_system import VotingSystems
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:8080"])

@app.route("/")
def hello():
    return "<h1>Hello World</h1>"

@app.route("/dhondt", methods=["POST"])
def dhondt_data():
    try:
        data = request.get_json()
        dhondt_data = VotingSystems.turnIntoDhondtData(data)
        result = VotingSystems.dhondt(dhondt_data, dict(), data["total_seats"])
        return result
    except Exception as e:
        app.logger.exception(e)
        return {"ERROR": "Invalid Data Received"}, 400
    
@app.route("/harelr", methods=["POST"])
def harelr_data():
    try:
        data = request.get_json()
        harelr_data = VotingSystems.turnIntoDhondtData(data)
        result = VotingSystems.hare_lr(harelr_data, dict(), data["total_seats"])
        return result
    except Exception as e:
        app.logger.exception(e)
        return {"ERROR": "Invalid Data Received"}, 400
    
@app.route("/sainte_lague", methods=["POST"])
def sainte_lague_data():
    try:
        data = request.get_json()
        harelr_data = VotingSystems.turnIntoDhondtData(data)
        result = VotingSystems.sainte_lague(harelr_data, dict(), data["total_seats"])
        return result
    except Exception as e:
        app.logger.exception(e)
        return {"ERROR": "Invalid Data Received"}, 400
    
@app.route("/preportional", methods=["POST"])
def preportionalRepresentation():
    data = request.get_json()
    print(data)
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