import './style.css';
import thunderstorm from './img/thunderstorm.jpg';
import drizzle from './img/drizzle.jpg';
import rain from './img/rain.jpg';
import snow from './img/snow.jpg';
import fog from './img/snow.jpg';
import noWeatherDay from './img/noWeatherDay.jpg';
import noWeatherNight from './img/noWeatherNight.jpg';

/*
 * optionally add a loading bit while the api is loaded 
 *     let time1 = performance.now();
    await fetch(testURL);
    let time2 = performance.now();
    return time2 - time1;
 *
 */
const submit = document.querySelector('#submit');
const footer = document.querySelector('#footerDiv');
const change = document.querySelector('#switch');
const regex = /\d{2}n/;
let forC = 'F';
let imperialOrMetric = 'imperial';
let mphOrKph = 'MPH';
let dayOrNight = 'd';

async function loadApi(location) {
  let time1 = performance.now();
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=${imperialOrMetric}&q=${location}&APPID=36b1d3fef9cba962fe3d291d6179522c`
  );
  const request = await response.json();
  let time2 = performance.now();
  console.log('last response time took ' + (time2 - time1) + ' milliseconds');
  return request;
}

async function getData(location) {
  const data = await loadApi(location).catch((err) => {
    // add error message to place on page here
    console.log(err);
  });
  const name = data.name;
  const main = data.main;
  const cloudPercent = data.clouds.all;
  const weather = data.weather;
  const wind = data.wind.speed;
  return { name, main, cloudPercent, weather, wind };
}

async function updateUI(uiData) {
  const ui = await uiData;
  if (regex.test(ui.weather[0].icon)) {
    dayOrNight = 'n';
  } else {
    dayOrNight = 'd';
  }
  const htmlName = document.querySelector('#name');
  const tempIcon = document.querySelector('#tempIcon');
  const temp = document.querySelector('.temp');
  const desc = document.querySelector('.desc');
  const hiLow = document.querySelector('.hiLow');
  const htmlWind = document.querySelector('#wind');
  const htmlCloud = document.querySelector('#cloud');
  const feelsLike = document.querySelector('#feelsLike');
  const humidity = document.querySelector('#humid');
  const span1 = document.createElement('span');
  const span2 = document.createElement('span');
  htmlName.textContent = ui.name;
  desc.textContent = ui.weather[0].description;
  temp.textContent = `${Math.round(ui.main.temp)}°${forC}`;
  tempIcon.src = `http://openweathermap.org/img/wn/${ui.weather[0].icon}@2x.png`;
  hiLow.innerHTML = '';
  span1.textContent = `H = ${Math.round(ui.main.temp_max)}°${forC}`;
  span2.textContent = `L = ${Math.round(ui.main.temp_min)}°${forC}`;
  hiLow.appendChild(span1);
  hiLow.appendChild(span2);
  htmlWind.textContent = `Wind Speed: ${ui.wind} ${mphOrKph}`;
  htmlCloud.textContent = `Cloudyness: ${ui.cloudPercent}%`;
  feelsLike.textContent = `Feels Like: ${Math.round(ui.main.feels_like)}`;
  humidity.textContent = `Humidity: ${ui.main.humidity}`;
  bodyImg(ui.weather[0].id);
}

async function bodyImg(id) {
  const newID = Math.floor(Number(id) / 100);
  let img;
  switch (newID) {
    case 2:
      img = thunderstorm;
      footer.innerHTML =
        "Picture by&nbsp;<a href='https://unsplash.com/@mantasos'>Tasos Mansour</a>";
      break;
    case 3:
      img = drizzle;
      footer.innerHTML =
        "Picture by&nbsp;<a href='https://unsplash.com/@synkevych'>Roman Synkevych</a>";
      break;
    case 5:
      img = rain;
      footer.innerHTML =
        "Picture by&nbsp;<a href='https://unsplash.com/@livvie_bruce'>Liv Bruce</a>";
      break;
    case 6:
      img = snow;
      footer.innerHTML =
        "Picture by&nbsp;<a href='https://unsplash.com/@aditya1702'>Aditya Vyas</a>";
      break;
    case 7:
      img = fog;
      footer.innerHTML =
        "Picture by&nbsp;<a href='https://unsplash.com/@goranvuc'>Goran Vučićević</a>";
      break;
    case 8:
      if (dayOrNight === 'n') {
        img = noWeatherNight;
        footer.innerHTML =
          "Picture by&nbsp;<a href='https://unsplash.com/@krisroller'>Kristopher Roller</a>";
        break;
      }
      img = noWeatherDay;
      footer.innerHTML = "Picture by&nbsp;<a href='https://unsplash.com/@eyf'>e (just e)</a>";
  }
  const body = document.querySelector('body');
  body.style.backgroundImage = `url(${img})`;
}

submit.addEventListener('click', () => {
  const city = document.querySelector('#city').value;
  const evtData = getData(city);
  updateUI(evtData);
});

change.addEventListener('click', () => {
  if (imperialOrMetric === 'imperial') {
    imperialOrMetric = 'metric';
    mphOrKph = 'KPH';
    forC = 'C';
  } else {
    imperialOrMetric = 'imperial';
    mphOrKph = 'MPH';
    forC = 'F';
  }
  const name = document.querySelector('#name').textContent;
  const evtData = getData(name);
  updateUI(evtData);
});

updateUI(getData('Dallas'));
