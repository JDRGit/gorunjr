// src/gorunIndex.js

function scale(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

export function calculateGoRunIndex(weather) {
  const { temperature, humidity, precipitation, windSpeed } = weather;

// Adjusted weights
const weights = {
  temperature: 6.5,  // Slightly increase the weight for temperature
  humidity: 0.55,    // Slight decrease in weight for humidity
  precipitation: 0.55, // Slight decrease in weight for precipitation
  windSpeed: 0.55,   // Slight decrease in weight for wind speed
};

// Adjusted scaling for temperature
const tempScore = scale(temperature, 50, 80, 10, 0); 

// Adjusted scaling for other factors
const humidityScore = scale(humidity, 55, 65, 10, 0);  // Narrowing the ideal range for humidity
const precipScore = precipitation ? scale(precipitation, 0, 0.03, 0, 10) : 10;  // Making precipitation even less influential
const windScore = scale(windSpeed, 0, 45, 10, 0);  // Further leniency on wind speed


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
