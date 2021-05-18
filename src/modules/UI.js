import APP from "./APP.js";
import { getIcon } from "./helper.js";

export default class UI {
  weatherData = "";

  static initButtons() {
    const tempDiv = document.getElementById("tempDiv");
    const cityDiv = document.getElementById("city");
    const searchIcon = document.getElementById("searchIcon");
    const hourlyBtn = document.getElementById("hourlyBtn");
    const weekBtn = document.getElementById("weekBtn");

    tempDiv.addEventListener("click", UI.showSearchBar);
    cityDiv.addEventListener("click", UI.showSearchBar);
    searchIcon.addEventListener("click", async () => {
      let data = await APP.handleRequest();
      UI.weatherData = data;
    });
    hourlyBtn.addEventListener("click", UI.showHourlyData);
    weekBtn.addEventListener("click", UI.showWeekData);
  }

  static showSearchBar() {
    const searchBar = document.querySelector(".inputDiv");
    if (searchBar.classList.contains("active")) {
      UI.closeSearchBar();
      return;
    } else {
      searchBar.classList.add("active");
    }
  }

  static closeSearchBar() {
    const searchBar = document.querySelector(".inputDiv");

    searchBar.classList.remove("active");
  }

  static copyCity() {
    const cityInput = document.getElementById("cityInput");

    return cityInput.value;
  }

  static fillMainData(data) {
    const tempDiv = document.querySelector(".mainTemp");
    const cityDiv = document.getElementById("city");
    const countryDiv = document.getElementById("country");
    const description = document.getElementById("desc");
    const tempIcon = document.getElementById("mainTempIcon");

    cityDiv.textContent = data.city;
    countryDiv.textContent = data.country;
    tempDiv.textContent = data.current.temp;
    description.textContent = data.current.desc;

    UI.changeIcon(tempIcon, data.current);
  }

  static fillHourlyData(data) {
    const infoPanel = document.querySelector(".infoPanel");
    infoPanel.innerHTML = "";

    for (let i = 0; i < 5; i++) {
      let weatherDiv = UI.createInfoPanelDiv(data.hourly[i]);
      infoPanel.appendChild(weatherDiv);
    }
  }

  static createInfoPanelDiv(data) {
    const weatherDiv = document.createElement("div");
    const timeDiv = document.createElement("div");
    const infoPanelDiv = document.createElement("div");
    const mainTemp = document.createElement("div");
    const minmax = document.createElement("div");
    const weatherIcon = document.createElement("i");
    const pop = document.createElement("div");

    weatherDiv.classList.add("weatherDiv");
    timeDiv.classList.add("timeDiv");
    infoPanelDiv.classList.add("infoPanelTemp");
    minmax.classList.add("minmax");
    weatherIcon.id = "tempIcon";
    UI.changeIcon(weatherIcon, data);
    pop.classList.add("pop");

    timeDiv.textContent = data.time;
    mainTemp.textContent = data.temp;
    pop.textContent = data.pop;

    infoPanelDiv.append(mainTemp, minmax);
    weatherDiv.append(timeDiv, infoPanelDiv, weatherIcon, pop);

    return weatherDiv;
  }

  static showHourlyData() {
    console.log(UI.weatherData);
  }

  static changeIcon(iconDiv, data) {
    iconDiv.className = "";

    const className = getIcon(data).toString();
    iconDiv.classList.add("wi", className);
  }
}