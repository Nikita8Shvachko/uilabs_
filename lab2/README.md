# Weather API Application

A simple Flask-based backend application to fetch weather data using the OpenWeather API. This application includes
endpoints to get current weather, a weather forecast, and a weather summary for a specified city.

---

## Features

- **Get Current Weather**: Fetch current weather information for a given city.
- **Get Weather Forecast**: Retrieve a 5-day weather forecast for a city.
- **Health Check**: Verify if the application is running correctly.
- **Weather Summary**: Get a summary of the weather, including temperature, description, and humidity.

---

## Prerequisites

Before running the application, ensure the following are installed on your system:

1. **Python 3.8+**
2. **pip** (Python package manager)
3. A valid **OpenWeather API key**

---

## Installation and Setup

Follow these steps to set up and run the application locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/weather-api-app.git
cd weather-api-app
```

### 2. Install Dependencies

Create a virtual environment and install required packages:

```
python3 -m venv venv
source venv/bin/activate  # For Linux/MacOS
venv\Scripts\activate     # For Windows

pip install -r requirements.txt
```

### 3. Add Your API Key

1. Register for an API key at OpenWeather.
2. Create a file named api_key.txt in the root directory.
3. Add your API key to the api_key.txt file:

```
YOUR_OPENWEATHER_API_KEY
```

### 4. Run the Application

Start the Flask development server:

`python app.py`

The server will run on http://127.0.0.1:5000 by default.

API Endpoints

1. `GET /current_weather`

Fetch the current weather for a specified city.
• URL: /current_weather?city=CityName
• Method: GET
• Parameters:
• city (required): The name of the city.
• Example:

```
GET http://127.0.0.1:5000/current_weather?city=London
```

• Response:

`{ "weather": [{ "description": "clear sky" }], "main": { "temp": 15.0, "humidity": 72 }, ... }`

2. `GET /forecast`

Retrieve a 5-day weather forecast for a specified city.
• URL: /forecast?city=CityName
• Method: GET
• Parameters:
• city (required): The name of the city.
• Example:

• Response:

```
GET http://127.0.0.1:5000/forecast?city=London
```

`
{
"list": [
{ "dt_txt": "2024-11-18 12:00:00", "main": { "temp": 15.0 } },
...
]
}`

3. `GET /health`

Verify that the application is running.
• URL: /health
• Method: GET
• Example:

```
GET http://127.0.0.1:5000/health
```

• Response:

`{ "status": "ok" }`

4. `GET /weather_summary`

Get a brief summary of the weather for a specified city.
• URL: /weather_summary?city=CityName
• Method: GET
• Parameters:
• city (required): The name of the city.
• Example:

```
GET http://127.0.0.1:5000/weather_summary?city=London
```

• Response:
`{ "city": "London", "temperature": 15.0, "description": "clear sky", "humidity": 72 }`
Application Logic

```
1.	Current Weather (/current_weather): Calls the OpenWeather API to fetch real-time weather data for a city.
2.	Forecast (/forecast): Fetches a 5-day weather forecast in 3-hour intervals for the specified city.
3.	Health Check (/health): Simple endpoint to confirm that the server is running properly.
4.	Weather Summary (/weather_summary): Processes weather data to return a concise summary, including temperature, weather description, and humidity.
```

Notes

```
•	Rate Limiting: Free OpenWeather API keys have a limited number of requests per minute. Ensure you stay within the limits to avoid errors.
•	Error Handling: If the city name is invalid or the API key is incorrect, the endpoints will return an error response with the relevant message.
```

