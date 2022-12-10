//get the user input using jQuery
let weatherData, userInput;

const $city = $("#city-name");
const $temp = $("#temp");
const $feels_like = $("#feels-like");
const $description = $("#description");
const $input = $("#userInput");

$("form").on("submit", handleGetData);

function handleGetData(event) {
  event.preventDefault();
  userInput = $input.val();
  //remove all spaces from the user input and + sign
  userInput = userInput.replace(/\s+/g, "+");

  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=imperial&appid=61711b14619e3fbede5ec3b9eb78ba83`,
  }).then(
    (data) => {
      console.log(data);
      weatherData = data;
      render();
    },
    (error) => {
      console.log("bad request", error);
      if (error.status === 404) {
        $("#error").text("City not found. Please try again.");

        setTimeout(() => {
          $("#error").text("");
        }, 2000);
        $input.val("");
      }
    }
  );
}

//add new paragraph to the DOM

function render() {
  $city.text(weatherData.name);

  $temp.text(Math.floor(weatherData.main.temp));

  $feels_like.text(Math.floor(weatherData.main.feels_like));
  $description.text(weatherData.weather[0].description);
  //clear the input field
  $input.val("");
}
