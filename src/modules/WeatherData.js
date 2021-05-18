export default class WeatherData {
  constructor() {
    this.city = "";
    this.county = "";
    this.lng = "";
    this.lat = "";
    this.current = {
      temp: "",
      desc: "",
      humidity: "",
      feel: "",
      windspeed: "",
      rain: "",
      id: "",
    };
    this.hourly = [];
    this.daily = [];
  }
}

