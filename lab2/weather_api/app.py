from flask import Flask, request, jsonify
import requests

app = Flask(__name__)
API_KEY = open("api_key.txt", "r").read().strip()


@app.route("/current_weather", methods=["GET"])
def current_weather():
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "City parameter is required"}), 400

    response = requests.get(
        "https://api.openweathermap.org/data/2.5/weather",
        params={"q": city, "appid": API_KEY, "units": "metric"}
    )
    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch data"}), response.status_code

    return jsonify(response.json())


@app.route("/forecast", methods=["GET"])
def forecast():
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "City parameter is required"}), 400

    response = requests.get(
        "https://api.openweathermap.org/data/2.5/forecast",
        params={"q": city, "appid": API_KEY, "units": "metric"}
    )
    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch data"}), response.status_code

    return jsonify(response.json())


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200



@app.route("/weather_summary", methods=["GET"])
def weather_summary():
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "City parameter is required"}), 400

    response = requests.get(
        "https://api.openweathermap.org/data/2.5/weather",
        params={"q": city, "appid": API_KEY, "units": "metric"}
    )
    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch data"}), response.status_code

    data = response.json()
    summary = {
        "city": city,
        "temperature": data["main"]["temp"],
        "description": data["weather"][0]["description"],
        "humidity": data["main"]["humidity"],
    }

    return jsonify(summary)


if __name__ == "__main__":
    app.run(debug=True)
