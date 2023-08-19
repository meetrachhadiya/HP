let loc = document.getElementById("location");
var tempicon = document.querySelector(".temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

//for fetch the weather for particular location or searched city

searchButton.addEventListener("click", (e) => {

  e.preventDefault();
  getWeather(searchInput.value);
  searchInput.value = '';

});

const getWeather = async (city) => {

  try {

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=037320d717c80a94096046ac54982733`);
    const weatherData = await response.json();

    const { name } = weatherData;
    const { feels_like } = weatherData.main;
    const { id, main } = weatherData.weather[0];

    loc.textContent = name;
    climate.textContent = main;
    tempvalue.textContent = Math.round(feels_like - 273);
    console.log(weatherData.weather[0]);
    console.log(id)
    console.log(tempicon);
    //for icons

    tempicon.src = "thunderstorm.png"

    if (id < 300 && id > 200) {
      tempicon.src = "./thunderstrom.png"
    }
    else if (id < 400 && id > 300) {
      tempicon.src = "./cloud.png"
    }
    else if (id < 600 && id > 500) {
      tempicon.src = "./rain.png"
    }
    else if (id < 700 && id > 600) {
      tempicon.src = "./snow.png"
    }
    else if (id < 800 && id > 700) {
      tempicon.src = "./clouds.png"
    }
    else if (id == 800) {
      tempicon.src = "./sun.png"
    }
    else if (id > 800) {
      tempicon.src = "./cloud&sun.png"
    }


  }
  catch (e) {
    alert('city not found');
  }

};

//fetching the weather for our current city

window.addEventListener("load", () => {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {

      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=037320d717c80a94096046ac54982733`;

      fetch(api).then((response) => {
        return response.json();
      })

        .then(data => {

          const { name } = data;
          const { feels_like } = data.main;
          const { id, main } = data.weather[0];

          loc.textContent = name;
          climate.textContent = main;
          tempvalue.textContent = Math.round(feels_like - 273);
          console.log(data);

          //for changing the icon according to weather

          if (id < 300 && id > 200) {
            tempicon.src = "./thunderstrom.png";
          }
          else if (id < 400 && id > 300) {
            tempicon.src = "./cloud.png"
          }
          else if (id < 600 && id > 500) {
            tempicon.src = "./rain.png"
          }
          else if (id < 700 && id > 600) {
            tempicon.src = "./snow.png"
          }
          else if (id < 800 && id > 700) {
            tempicon.src = "./clouds.png"
          }
          else if (id = 800) {
            tempicon.src = "./sun.png"
          }
          else if (id > 800) {
            tempicon.src = "./cloud&sun.png"
          }

        })

    })
  }
})