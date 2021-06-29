const request = require('request');

// // Geocoding
// const mapUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibmFtaG9hbmc5MDkiLCJhIjoiY2twdzF2dGZ0MW1tNDJwcXZvOTI0MHBpciJ9.VQqMTFO7xUca0jk1hQHKRg";

// request({ url: mapUrl, json: true }, ( err, response ) => {
//   if(err) {
//     console.log("Unable to connect to location service!");
//   } else if(response.body.message) {
//     console.log(response.body.message);
//   } else if(response.body.features.length === 0) {
//     console.log("Unable to find the location. Please try another input.");
//   } else {
//     const { center } = response.body.features[0];
//     const [longitude, latitude] = center;
//     console.log("Latitude:", latitude + ", longitude:", longitude);
//   };
// });

const geocode = ( address, callback ) => {
  const mapUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibmFtaG9hbmc5MDkiLCJhIjoiY2twdzF2dGZ0MW1tNDJwcXZvOTI0MHBpciJ9.VQqMTFO7xUca0jk1hQHKRg";

  request({url: mapUrl, json: true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location service!', undefined);
    } else if (body.message) {
      callback(body.message, undefined)
      console.log(body.message);
    } else if (body.features.length === 0) {
      callback("Unable to find the location. Please try another input.", undefined);
    } else {
      callback(null, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    };
  });
};

module.exports = geocode;