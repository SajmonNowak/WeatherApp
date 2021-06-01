const APIKey = "d00251ce110d25d4425b2eede28a4a09";

async function getWeatherInfo(weatherData, mode) {
  const lat = weatherData.lat;
  const lng = weatherData.lng;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${APIKey}&units=${mode}`
  );
  const data = await response.json();
  return data;
}

export default getWeatherInfo;
