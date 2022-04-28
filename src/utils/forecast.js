const request = require("request");

const forecast = (a, b, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    a +
    "&lon=" +
    b +
    "&appid=14cd287471e6aa813af01a1a9c921ccf&units=metric";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect", undefined);
    } else if (body.cod === "400") {
      callback("Couldnt find forecast, try again", undefined);
    } else {
      callback(
        undefined,
        "The forecast: " +
          body.weather[0].description +
          ". Temperature: " +
          body.main.temp +
          " Degrees." +
          " Temp perceived: " +
          body.main.feels_like +
          " Degrees"
      );
    }

    //console.log(response.body.main.temp);
  });
};

module.exports = forecast;
