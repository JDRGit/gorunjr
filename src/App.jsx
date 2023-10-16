import { useState, useEffect } from "react";
import { calculateGoRunIndex } from "./gorunIndex";
import axios from "axios";

function App() {
  const [goRunIndex, setGoRunIndex] = useState(null);
  const [feelsLikeTemperature, setFeelsLikeTemperature] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
          const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`;

          axios.get(endpoint).then((response) => {
            const weatherData = {
              temperature: response.data.main.temp,
              humidity: response.data.main.humidity,
              windSpeed: response.data.wind.speed,
              precipitation: response.data.rain && response.data.rain['1h'] ? response.data.rain['1h'] : 0 
            };
          
            const index = calculateGoRunIndex(weatherData);
            setGoRunIndex(index);
          
            // Set the "feels like" temperature
            setFeelsLikeTemperature(response.data.main.feels_like);
          });
          
        },
        (error) => {
          console.error("Error obtaining geolocation", error);
          // You might want to handle this error in the UI to inform the user.
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      // Again, consider handling this in the UI.
    }
  }, []);

  return (
    <div className="App">
      <h1>GoRun Index</h1>
      {goRunIndex ? (
        <div>
          <p>The current GoRun Index is: {goRunIndex}</p>
          <p>It feels like {feelsLikeTemperature}°F outside.</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
