import React, { useState, useEffect } from 'react';

const WeatherAPI = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    // Fetch weather data from your API and update the state
    // Example: fetch('your_api_endpoint').then(response => response.json()).then(data => setWeatherData(data));
  }, []);

  return (
    <div>
      {/* Render weather data in the desired format */}
      {weatherData.map((data) => (
        <div key={data.timestamp}>
          {/* Display weather data */}
          <p>{data.timestamp}: {data.temperature}°C, {data.description}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherAPI;