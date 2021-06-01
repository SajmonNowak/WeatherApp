import getWeatherInfo from "./WeatherAPI.js";
import getCoordinates from "./GeocodingAPI.js";
import WeatherData from "./WeatherData.js";
import UI from "./UI";
import { convertToHour, convertToDay, getTimeOfDay } from "./helper.js";

const APP = (() => {
  const initialiseApp = () => {
    UI.initButtons();
    handleRequest("Bochum");
  };

  const handleRequest = async (city) => {
    if (city == undefined) {
      city = UI.copyCity();
      UI.closeSearchBar();
    }
    const weatherData = await createWeatherObject(city);
    await UI.fillMainData(weatherData);
    await UI.fillHourlyData(weatherData);
    UI.weatherData = weatherData;
  };

  const createWeatherObject = async (city) => {
    const weatherData = new WeatherData();
    await fillGeoCodingInfo(weatherData, city);
    await fillWeatherInfo(weatherData);

    return weatherData;
  };

  const fillGeoCodingInfo = async (weatherData, city) => {
    const data = await getCoordinates(city);

    weatherData.city = data.name;
    weatherData.country = " (" + data.country + ")";
    weatherData.lat = data.lat;
    weatherData.lng = data.lon;
  };

  const fillWeatherInfo = async (weatherData) => {
    const data = await getWeatherInfo(weatherData, "metric");

    fillCurrentInfo(weatherData.current, data);
    fillHourlyInfo(weatherData.hourly, data);
    fillDailyInfo(weatherData.daily, data.daily);
  };

  const fillCurrentInfo = (current, data) => {
    current.temp = Math.round(data.current.temp) + "°";
    current.id = data.current.weather[0].id;
    current.humidity = data.current.humidity;
    current.feel = data.current.feels_like;
    current.windspeed = data.current.wind_speed;
    current.clouds = data.current.clouds;
    current.rain = data.hourly[0].pop;
    current.dayTime = getTimeOfDay(data.hourly[0].dt, data);
    selectBackground(current);
  };

  const fillHourlyInfo = (hourly, data) => {
    for (let i = 1; i < 17; i++) {
      const info = {
        temp: Math.round(data.hourly[i].temp) + "°",
        desc: data.hourly[i].weather[0].description,
        pop: Math.round(data.hourly[i].pop * 100) + " %",
        time: convertToHour(data.hourly[i].dt, data),
        id: data.hourly[i].weather[0].id,
      };
      hourly.push(info);
    }
  };

  const fillDailyInfo = (daily, data) => {
    for (let i = 1; i < 7; i++) {
      const info = {
        temp: Math.round(data[i].temp.day) + "°",
        max: Math.round(data[i].temp.max),
        min: Math.round(data[i].temp.min),
        time: convertToDay(data[i].dt),
        desc: data[i].weather[0].description,
        pop: Math.round(data[i].pop * 100) + " %",
        id: data[i].weather[0].id,
      };

      daily.push(info);
    }
  };

  const selectBackground = (data) => {
    if (data.dayTime == "day") {
      switch (true) {
        case 10 > data.clouds:
          data.background = "Sunny.jpg";
          break;
        case 98.9 > data.clouds:
          data.background = "Cloudy.jpg";
          break;
        case 98.9 < data.clouds:
          data.background = "VeryCloudy.jpg";
          break;
      }
    } else {
      switch (true) {
        case 19.99 > data.clouds:
          data.background = "Night.jpg";
          break;
        case 19.99 < data.clouds:
          data.background = "CloudyNight.jpg";
          break;
      }
    }
  };

  return { initialiseApp, handleRequest };
})();

export default APP;
