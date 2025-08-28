import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    try {
      setError("");
      setWeather(null);

      // 1. City → Latitude/Longitude
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError("City not found 🚫");
        return;
      }

      const { latitude, longitude } = geoData.results[0];

      // 2. Weather fetch
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      setWeather(weatherData.current_weather);
    } catch (err) {
      setError("Error fetching weather ❌");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">🌤️ Weather Now</h1>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border p-2 rounded w-64 mb-3"
      />
      <button
        onClick={getWeather}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Get Weather
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {weather && (
        <div className="mt-4 p-4 bg-white rounded shadow-md">
          <p>🌡️ Temperature: {weather.temperature}°C</p>
          <p>💨 Windspeed: {weather.windspeed} km/h</p>
          <p>🧭 Wind direction: {weather.winddirection}°</p>
          <p>⏱️ Time: {weather.time}</p>
        </div>
      )}
    </div>
  );
}

export default App;
