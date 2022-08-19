import './style.css';

/*
 * https://api.openweathermap.org/data/2.5/weather?units=imperial&q=Pampa&APPID=36b1d3fef9cba962fe3d291d6179522c
 *
 * function to call api / will take location and return weather data
 * function that processes the JSON data from the api / return an object with only data the app needs
 * make form for the user input of location
 * set up the display of the page to show the info
 * optionally add a loading bit while the api is loaded 
 *     let time1 = performance.now();
    await fetch(testURL);
    let time2 = performance.now();
    return time2 - time1;
 *
 */

const location = '';

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
  const cloudPercent = data.clouds;
  const weatherTemps = data.weather;
  const wind = data.wind;
  return { name, main, cloudPercent, weatherTemps, wind };
}

getData('pampa');
