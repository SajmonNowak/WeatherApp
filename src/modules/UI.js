import APP from "./APP.js";
import { getIcon } from "./helper.js";
import RainyDay from "./rainyday.js";

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
    searchIcon.addEventListener("click", () => {
      APP.handleRequest();
    });
    dayBtn.addEventListener("click", () => {
      UI.fillHourlyData(UI.weatherData);
      UI.activateBtn("hourly");
    });
    weekBtn.addEventListener("click", () => {
      UI.fillDailyData(UI.weatherData);
      UI.activateBtn("daily");
    });
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
    UI.changeBackground(data.current);
    UI.displayRain(data.current);
  }

  static fillHourlyData(data) {
    const infoPanel = document.querySelector(".infoPanel");
    infoPanel.innerHTML = "";

    for (let i = 0; i < 16; i++) {
      let hourlyInfoDiv = UI.createInfoPanelDiv(data.hourly[i]);
      if (i % 2 == 0) {
        hourlyInfoDiv.classList.add("darkerInfoDiv");
      }
      infoPanel.appendChild(hourlyInfoDiv);
    }
  }

  static fillDailyData(data) {
    const infoPanel = document.querySelector(".infoPanel");
    infoPanel.innerHTML = "";
    for (let i = 0; i < 6; i++) {
      let dailyInfoDiv = UI.createInfoPanelDiv(data.daily[i]);
      if (i % 2 == 0) {
        dailyInfoDiv.classList.add("darkerInfoDiv");
      }
      UI.fillMinMax(dailyInfoDiv, data.daily[i]);
      infoPanel.appendChild(dailyInfoDiv);
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
    mainTemp.classList.add("temp");
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

  static fillMinMax(div, data) {
    const mDiv = div.querySelector(".minmax");

    mDiv.textContent = data.min + " / " + data.max;
  }

  static activateBtn(btn) {
    const activeBtn = document.querySelector(".activeOption");
    activeBtn.classList.remove("activeOption");

    if (btn == "hourly") {
      const dayBtn = document.getElementById("dayBtn");
      dayBtn.classList.add("activeOption");
    } else {
      const weekBtn = document.getElementById("weekBtn");
      weekBtn.classList.add("activeOption");
    }
  }

  static changeIcon(iconDiv, data) {
    iconDiv.className = "";

    const className = getIcon(data).toString();
    iconDiv.classList.add("wi", className);
  }

  static changeBackground(data) {
    const page = document.querySelector(".page");
    page.style.backgroundImage = "none";
    page.style.backgroundImage = `url(imgs/${data.background})`;
  }

  static displayRain(data) {
    if (data.rain > 0.2) {
      const page = document.querySelector(".page");
      var rainyDay = new RainyDay({ image: page });
      rainyDay.rain([[5, 2, 9]], 5);
    }
  }
}
