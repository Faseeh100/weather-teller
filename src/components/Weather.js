import React, { useState } from 'react';
import axios from 'axios';


const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city name');
      setWeather(null);
      return;
    }

    try {
      const apiKey = '66bfcca030db26727a6af64a56c5ccf1'; 
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('City not found');
      setWeather(null);
    }
  };

  const getWeatherIcon = (description) => {
    if (description.includes('clear')) return '☀️'; 
    if (description.includes('cloud')) return '☁️'; 
    if (description.includes('rain')) return '🌧️'; 
    if (description.includes('snow')) return '❄️';
    return '🌈'; 
  };

  return (
    <div>
        <h1>Check Today's Weather</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {error && <p>{error}</p>}

      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Description: {weather.weather[0].description}</p>
          <p className="icons">{getWeatherIcon(weather.weather[0].description)}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
