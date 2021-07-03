console.log("app.js is loaded");
// puzzle.mead.io/puzzle
fetch('http://puzzle.mead.io/puzzle' ).then((response) => {
  response.json().then((data) => {
    console.log(data);
  })
});

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const locationMessage = document.querySelector('.location');
const forecastMessage = document.querySelector('.forecast');

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const location = search.value;
  locationMessage.textContent = "Loading";
  forecastMessage.textContent = "";
  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        locationMessage.textContent = data.error;
      } else {
        const { location, forecast } = data;
        const { locationName, country } = location;
        console.log(location);
        locationMessage.innerHTML = `Location name: ${locationName}, country: ${country}.`;
        console.log(forecast);
        forecastMessage.textContent = forecast;
      };
    });
  });
})
