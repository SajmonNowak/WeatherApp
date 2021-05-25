import getWeatherInfo from "./WeatherAPI.js";
import getCoordinates from "./GeocodingAPI.js";
import WeatherData from "./WeatherData.js";
import UI from "./UI";
import { convertToHour, convertToDay } from "./helper.js";

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
    UI.fillMainData(weatherData);
    UI.fillHourlyData(weatherData);
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

    fillCurrentInfo(weatherData.current, data.current);
    fillHourlyInfo(weatherData.hourly, data.hourly);
    fillDailyInfo(weatherData.daily, data.daily);
  };

  const fillCurrentInfo = (current, data) => {
    current.temp = Math.round(data.temp) + "°";
    current.desc = data.weather[0].description;
    current.id = data.weather[0].id;
    current.humidity = data.humidity;
    current.feel = data.feels_like;
    current.windspeed = data.wind_speed;
  };

  const fillHourlyInfo = (hourly, data) => {
    for (let i = 1; i < 17; i++) {
      const info = {
        temp: Math.round(data[i].temp) + "°",
        desc: data[i].weather[0].description,
        pop: Math.round(data[i].pop * 100) + " %",
        time: convertToHour(data[i].dt),
        id: data[i].weather[0].id,
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
        pop: data[i].pop *100 + " %",
        id: data[i].weather[0].id,
      };

      daily.push(info);
    }
  };

  return { initialiseApp, handleRequest };
})();

export default APP;
