// src/gorunIndex.js

function scale(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }
  
  export function calculateGoRunIndex(weather) {
    const { temperature, humidity, precipitation, windSpeed } = weather;
  
    // Scale each factor between 0 and 10
    const tempScore = scale(temperature, 20, 95, 10, 0);
    const humidityScore = scale(humidity, 10, 90, 10, 0);
    const precipScore = precipitation ? scale(precipitation, 0, 1, 0, 10) : 10;  // assuming scale from 0mm to 1mm in the last hour
    const windScore = scale(windSpeed, 0, 20, 10, 0);
  
    // Weights for each factor
    const weights = {
      temperature: 2,
      humidity: 1.5,
      precipitation: 1.5,
      windSpeed: 1,
    };
  
    const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
  
    // Calculate the weighted average
    const index =
      (tempScore * weights.temperature +
        humidityScore * weights.humidity +
        precipScore * weights.precipitation +
        windScore * weights.windSpeed) /
      totalWeight;
  
    return index.toFixed(2);
  }
  