// const weatherUrl = "http://api.weatherstack.com/current?access_key=a68292990c978ca454b15aa9ee60cd8f&query=37.8267,-122.4233&units=f";
const request = require("request");

// request({ url: weatherUrl, json: true }, ( err, response ) => {
//   if(err) {
//     console.log("Unable to connect to weather service!");
//   } else if(response.body.success === false) {
//     console.log(response.body.error.info);
//   } else {
//     const { location, current } = response.body;
//     console.log("At", current.observation_time, "it is", current.weather_descriptions[0], "outside,", "the temperature is", current.temperature, "F degree.");
//   };
// });

const weatherInfo = (latitude, longitude, callback) => {
  const weatherUrl = "http://api.weatherstack.com/current?access_key=a68292990c978ca454b15aa9ee60cd8f&query=" + latitude + "," + longitude + "&units=f";

  request({ url: weatherUrl, json: true }, ( error, { body } ) => {
    if( error ) {
      callback("Unable to connect to weather service!", undefined);
    } else if(  body.success === false ) {
      callback( body.error.info, undefined );
    } else {
      const { location, current } = body;
      callback(undefined, {
        location: {
          location_name: location.name,
          country: location.country,
        },
        current: {
          humidity: current.humidity,
          observation_time: current.observation_time,
          temperature: `${current.temperature}`,
          feelslike: `${current.feelslike}`,
          weather_descriptions: current.weather_descriptions,
        },
      });
    };
  });
};

module.exports = weatherInfo;