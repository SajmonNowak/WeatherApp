export default class WeatherData {
  constructor() {
    this.city = "";
    this.county = "";
    this.lng = "";
    this.lat = "";
    this.current = {
      temp: "",
      humidity: "",
      feel: "",
      windspeed: "",
      rain: "",
      id: "",
      clouds: "",
      background: "",
      dayTime: "",
    };
    this.hourly = [];
    this.daily = [];
  }
}
