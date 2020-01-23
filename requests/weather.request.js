// https://gist.github.com/derzorngottes/3b57edc1f996dddcab25 - Hide API Keys on Github

var requestPromise = require("request-promise"); // https://github.com/request/request-promise

module.exports = async function(city = "") {
  if (!city) {
    console.log("City should be filled");
  }
  console.log("City: ", city);

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

  // Start. My uneened code anymore 
  // const my_request_url_with_parameters = URL + "?q=" + city + "&appid=" + API_KEY + "&units=imperial";
  // const options2 = {
  //   uri: my_request_url_with_parameters,
  //   json: true
  // };
  // End

  try {
    const data = await requestPromise(options);
    console.log("DataObj", data);
    if (data) {
      const celsius = ((data.main.temp - 32) * 5) / 9;

      return {
        weather: `${data.name}: ${celsius.toFixed(0)}`,
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

  // var unirest = require("unirest");

  // var req = unirest("POST", "https://accuweatherstefan-skliarovv1.p.rapidapi.com/get24HoursConditionsByLocationKey");

  // req.headers({
  //     "x-rapidapi-host": "AccuWeatherstefan-skliarovV1.p.rapidapi.com",
  //     "x-rapidapi-key": "4a0ac4212cmsh35f41b479108785p1a8667jsn4d53cd848a6c",
  //     "content-type": "application/x-www-form-urlencoded"
  // });

  // req.form({});

  // req.end(function (res) {
  //     if (res.error) throw new Error(res.error);

  //     console.log(res.body);
  // });
};
