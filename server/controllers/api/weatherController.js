var OAuth = require("oauth");
require("dotenv").config();

/* Using Async module, Begin */
var _ = require("lodash");
var async = require("async");
/* Using Async module, End */

/* Using Axios module, Begin */
var axios = require("axios");
/* Using Axios module, End */

exports.index = function(req, res) {
  res.status(200).send([]);
};

exports.getCityWeather = function(req, res) {
  var cityOrZipCode = req.params.cityOrZipCode;

  var CityBase = true;

  if (cityOrZipCode == "zipcode") {
    CityBase = false;
  }

  var cityOrZip = req.params.cityZip
    ? req.params.cityZip
    : CityBase
    ? process.env.DEFAULT_CITY
    : process.env.DEFAULT_CITY_ZIP_CODE;

  var header = {
    "X-Yahoo-App-Id": process.env.YAHOO_APP_ID
  };

  var request = new OAuth.OAuth(
    null,
    null,
    process.env.YAHOO_CLIENT_ID,
    process.env.YAHOO_CLIENT_SECRET,
    "1.0",
    null,
    "HMAC-SHA1",
    null,
    header
  );

  //var url = `https://weather-ydn-yql.media.yahoo.com/forecastrss?location=${cityOrZip}&format=json`;
  var url = process.env.YAHOO_API_URL + "&location=" + cityOrZip;

  if (!CityBase) {
    //url = `https://weather-ydn-yql.media.yahoo.com/forecastrss?woeid=${cityOrZip}&format=json`;
    url = process.env.YAHOO_API_URL + "&woeid=" + cityOrZip;
  }

  request.get(url, null, null, function(err, data, result) {
    console.log("err:", err);

    var statusCode =
      typeof result !== "undefined" && result && result.statusCode
        ? result.statusCode
        : 500;
    var statusMessage =
      typeof result !== "undefined" && result && result.statusMessage
        ? result.statusMessage
        : "500 Internal Server Error";

    if (err) {
      //return res.status(400).send(err);
      return res.status(statusCode).json({
        status: statusCode,
        message: statusMessage,
        data: err
      });
    } else {
      //return res.status(200).send(data);
      return res.status(statusCode).json({
        status: statusCode,
        message: statusMessage,
        data: JSON.parse(data)
      });
    }
  });
};

exports.getCitiesWeather = function(req, res) {
  var cityOrZipCode = req.params.cityOrZipCode;

  var CityBase = true;

  if (cityOrZipCode == "zipcode") {
    CityBase = false;
  }

  console.log("req.body: ", req.body);

  var citiesOrZips =
    req && req.body
      ? req.body
      : CityBase
      ? [process.env.DEFAULT_CITY]
      : [process.env.DEFAULT_CITY_ZIP_CODE];

  var statusCode = 500;
  var statusMessage = "500 Internal Server Error";

  var citiesWeather = [];

  var header = {
    "X-Yahoo-App-Id": process.env.YAHOO_APP_ID
  };

  var request = new OAuth.OAuth(
    null,
    null,
    process.env.YAHOO_CLIENT_ID,
    process.env.YAHOO_CLIENT_SECRET,
    "1.0",
    null,
    "HMAC-SHA1",
    null,
    header
  );

  if (citiesOrZips.length > 0) {
    console.log("citiesOrZips: ", citiesOrZips);

    /* Using Promise and Foreach, Begin */
    /*
    citiesOrZips.forEach(function(cityOrZip) {
      //var url = `https://weather-ydn-yql.media.yahoo.com/forecastrss?location=${cityOrZip}&format=json`;
      var url = process.env.YAHOO_API_URL + "&location=" + cityOrZip;

      if (!CityBase) {
        //url = `https://weather-ydn-yql.media.yahoo.com/forecastrss?woeid=${cityOrZip}&format=json`;
        url = process.env.YAHOO_API_URL + "&woeid=" + cityOrZip;
      }

      citiesWeather.push(
        new Promise(function(resolve, reject) {
          console.log("cityOrZip: ", cityOrZip);
          request.get(url, null, null, function(err, data, result) {
            statusCode =
              typeof result !== "undefined" && result && result.statusCode
                ? result.statusCode
                : 500;
            statusMessage =
              typeof result !== "undefined" && result && result.statusMessage
                ? result.statusMessage
                : "500 Internal Server Error";

            if (err) {
              //reject(JSON.parse(err));

              console.log("err:", err);
              return reject({
                error: 1,
                status: statusCode,
                message: statusMessage,
                data: err
              });
            } else {
              //resolve(JSON.parse(data));

              if (CityBase) {
                console.log(
                  `result of ${cityOrZip} city: `,
                  result.statusMessage
                );
              } else {
                console.log(
                  `result of ${cityOrZip} zipcode: `,
                  result.statusMessage
                );
              }

              resolve({
                [cityOrZip]: {
                  error: 0,
                  status: statusCode,
                  message: statusMessage,
                  data: JSON.parse(data)
                }
              });
            }
          });
        })
      );
    });
    Promise.all(citiesWeather).then(function(results) {
      //res.send(results);

      console.log("results: ", results);
      return res.status(statusCode).json({
        status: statusCode,
        message: statusMessage,
        data: results
      });
    });
    */
    /* Using Promise and Foreach, End */

    /* Using Async module, Begin */
    async.map(
      citiesOrZips,
      function(cityOrZip, callback) {
        console.log("cityOrZip: ", cityOrZip);

        //var url = `https://weather-ydn-yql.media.yahoo.com/forecastrss?location=${cityOrZip}&format=json`;
        var url = process.env.YAHOO_API_URL + "&location=" + cityOrZip;

        if (!CityBase) {
          //url = `https://weather-ydn-yql.media.yahoo.com/forecastrss?woeid=${cityOrZip}&format=json`;
          url = process.env.YAHOO_API_URL + "&woeid=" + cityOrZip;
        }

        request.get(url, null, null, function(err, data, result) {
          statusCode =
            typeof result !== "undefined" && result && result.statusCode
              ? result.statusCode
              : 500;
          statusMessage =
            typeof result !== "undefined" && result && result.statusMessage
              ? result.statusMessage
              : "500 Internal Server Error";

          if (err) {
            console.log("err:", err);
            return callback({
              error: 1,
              status: statusCode,
              message: statusMessage,
              data: err
            });
          }

          if (CityBase) {
            console.log(`result of ${cityOrZip} city: `, result.statusMessage);
          } else {
            console.log(
              `result of ${cityOrZip} zipcode: `,
              result.statusMessage
            );
          }

          callback(null, {
            [cityOrZip]: {
              error: 0,
              status: statusCode,
              message: statusMessage,
              data: JSON.parse(data)
            }
          });
        });
      },
      function(err, results) {
        // results is an array of names
        if (err) {
          console.log("err2:", err);
        }
        console.log("results: ", results);
        return res.status(statusCode).json({
          status: statusCode,
          message: statusMessage,
          data: results
        });
      }
    );
    /* Using Async module, End */
  }
};
