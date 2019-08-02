import axios from "axios";
import moment from "moment";

export const API_KEY = "2d3f3209d60edcc35fc7d1abb01d7cb0";

export const getWeatherCity = (city, country) => {
  const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&appid=${API_KEY}`;
  return axios
    .get(URL)
    .then((res) => res)
    .catch((err) => err);
};

export const getWeatherGeoLoc = (lat, lon) => {
  const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  return axios
    .get(URL)
    .then((res) => res)
    .catch((err) => err);
};

/* eslint-disable */
export const roundToDigits = (num, digits) =>
  Number(Math.round(num + "e" + digits) + "e-" + digits);
/* eslint-disable */

export const calcAvg = (array) =>
  array.reduce((acc, cV) => acc + cV) / array.length;

// export const getDayFromTimestamps =
/* eslint-disable */

export const addDataToDays = (listOfDays) => {
  let days = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
  };

  const numberOfDays = Object.keys(days).length;
  let starterIndex = 0;
  let starterDay = new Date(listOfDays[0].dt * 1000).getDay();

  listOfDays.forEach((row) => {
    const dayOfRow = new Date(row.dt * 1000).getDay();
    if (dayOfRow != starterDay) {
      starterIndex++;
      starterDay = dayOfRow;
    }
    if (starterIndex < numberOfDays) {
      days[starterIndex].push(row);
    }
  });
  return days;
};

// find min, find max, calc total parameter avg on each day
export const condensedDayConditions = (apiDataDay) => {
  //Whole day`s array of temperatures
  const temps = apiDataDay.map((data) => data.main.temp);

  const maxTemp = roundToDigits(Math.max(...temps), 0);
  const minTemp = roundToDigits(Math.min(...temps), 0);
  const avgWind = roundToDigits(
    calcAvg(apiDataDay.map((data) => data.wind.speed)),
    1,
  );
  const avgHumidity = roundToDigits(
    calcAvg(apiDataDay.map((data) => data.main.humidity)),
    0,
  );
  const avgClouds = roundToDigits(
    calcAvg(apiDataDay.map((data) => data.clouds.all)),
    0,
  );
  return { maxTemp, minTemp, avgHumidity, avgClouds, avgWind };
};

export const getAvgTemp = (apiDataDay) => {
  const timeOfDayNow = 0;
  const timeOfDayMidday = 4;
  let avgTemp;
  if (apiDataDay.length < 8) {
    avgTemp = roundToDigits(apiDataDay[timeOfDayNow].main.temp, 0);
  } else {
    avgTemp = roundToDigits(apiDataDay[timeOfDayMidday].main.temp, 0);
  }
  return avgTemp;
};

export const getDataToDisplay = (days) =>
  Object.values(days).map((day) => {
    const maxNumberOfDataPerDay = 8;
    const iconCode =
      day.length < maxNumberOfDataPerDay
        ? day[0].weather[0].icon
        : day[5].weather[0].icon;
    return {
      iconCode,
      dayOfWeek: moment(day[0].dt * 1000).format("dddd"),
      ...condensedDayConditions(day),
      avgTemp: getAvgTemp(day),
    };
  });

export const dataProvider = (rawData) => {
  let days = addDataToDays(rawData);
  let data = getDataToDisplay(days);
  return data;
};

export const formattedDataToComponent = async (values) => {
  try {
    const data = await getWeatherCity(values.city, values.country);
    const weather = dataProvider(data.data.list);
    const city = data.data.city.name;
    return { err: false, weather, city };
  } catch (error) {
    return { err: true, errorMsg: "Couldn't get weather, check spelling" };
  }
};
