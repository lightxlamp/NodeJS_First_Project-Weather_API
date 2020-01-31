// https://gist.github.com/derzorngottes/3b57edc1f996dddcab25 - Hide API Keys on Github

const requestPromise = require("request-promise"); // https://github.com/request/request-promise
//import API_KEY from './../my_config'

module.exports = async function(city = "") {

  if (!city) {
    console.log("City should be filled");
  }
  //console.log("City: ", city);

  const API_KEY = "6dbb6b54a0a5123ae62a1cca20e4cc09";
  const URL = "http://api.openweathermap.org/data/2.5/weather";

  var options = {
    uri: URL,
    qs: {
      q: city,
      appid: API_KEY,
      units: "imperial"
    },
    headers: {
      "User-Agent": "Request-Promise"
    },
    json: true
  };

  try {
    const data = await requestPromise(options);
    //console.log("DataObj", data);
    if (data) {
      const celsius = ((data.main.temp - 32) * 5) / 9;

      return {
        weather: `${data.name}: ${celsius.toFixed(0)} ℃`,
        error: null
      };
    }
  } catch (error) {
    console.log("errorOBJ", error);
    console.log(error.error.message);
    return {
      weather: null,
      error: error.error.message
    };
  }
};
