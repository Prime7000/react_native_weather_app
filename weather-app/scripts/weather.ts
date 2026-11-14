async function getWeather() {
  const url = "https://api.open-meteo.com/v1/forecast";

  const params = new URLSearchParams({
    latitude: "6.335",
    longitude: "5.628",
    current: "temperature_2m,relative_humidity_2m",
    daily:
      "temperature_2m_max,temperature_2m_min,precipitation_probability_max",
    timezone: "Africa/Lagos",
    forecast_days: "7",
  });

  const response = await fetch(`${url}?${params}`);

  if (!response.ok) {
    const errorDetails = await response.text();

    console.error("HTTP Status:", response.status);
    console.error("API Error:", errorDetails);

    throw new Error("Could not fetch weather");
  }

  const weather = await response.json();

  console.log("Current:", weather.current);
  console.log("7-day forecast:", weather.daily);
}

getWeather().catch(console.error);
