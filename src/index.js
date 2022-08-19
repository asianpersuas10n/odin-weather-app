import './style.css';

/*
 * https://api.openweathermap.org/data/2.5/weather?units=imperial&q=Pampa&APPID=36b1d3fef9cba962fe3d291d6179522c
 *
 * set up the display of the page to show the info
 * optionally add a loading bit while the api is loaded 
 *     let time1 = performance.now();
    await fetch(testURL);
    let time2 = performance.now();
    return time2 - time1;
 *
 */
const submit = document.querySelector('#submit');
const forC = 'F';

async function loadApi(location) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${location}&APPID=36b1d3fef9cba962fe3d291d6179522c`
  );
  const request = await response.json();
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
  htmlWind.textContent = `Wind Speed: ${ui.wind} MPH`;
  htmlCloud.textContent = `Cloudyness: ${ui.cloudPercent}%`;
  feelsLike.textContent = `Feels Like: ${Math.round(ui.main.feels_like)}`;
  humidity.textContent = `Humidity: ${ui.main.humidity}`;
  bodyImg();
}

submit.addEventListener('click', () => {
  const city = document.querySelector('#city').value;
  const evtData = getData(city);
  updateUI(evtData);
});

updateUI(getData('Dallas'));
