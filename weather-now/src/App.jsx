import React, { useState, useEffect } from "react";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    try {
      const apiKey = "8818fd709208eaec05209e5677462bbf";
      
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();
      console.log(data);
      setWeather(data);
    } catch (err) {
      console.error(err);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchWeather(city);
  };

  useEffect(() => {
    // Default city weather Hyderabad
    fetchWeather("Hyderabad");
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Weather Now</h1>

      <div className="flex mb-6">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="p-2 rounded-l-md text-black"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 px-4 rounded-r-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {weather && weather.main && (
        <div className="bg-gray-800 p-6 rounded-md shadow-md w-80 text-center">
          <h2 className="text-xl font-bold">{weather.name}</h2>
          <p className="text-2xl">{weather.main.temp}°C</p>
          <p>{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
