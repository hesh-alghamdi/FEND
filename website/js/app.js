// API informations
const apiURL = 'http://api.openweathermap.org/data/2.5/weather?units=metric';
const apiKey = 'a6c42706782cc9d8c193fc06e62d1795';

// Get the date of the user's device
let date = new Date();
let userDate = date.toLocaleDateString();

// Event listener to the press of the button
document
  .querySelector('#generate')
  .addEventListener('click', generateWeatherData);

// Get the weather of the city provided by the user
// I decided to use cities instead of ZIP codes since I couldn't
// Validate the results when choosing any ZIP code of a Saudi city
function generateWeatherData() {
  // const zip = document.querySelector('#zip').value;
  const city = document.querySelector('#city').value;
  const feelings = document.querySelector('#feelings').value;

  temperature(apiURL, city, apiKey).then(function (data) {
    postWeatherData(`http://localhost:3000/weatherData`, {
      temp: data.main.temp,
      weatherIcons: data.weather[0].icon,
      date: userDate,
      userFeelings: feelings,
      weatherDescription: data.weather[0].description,
    }).then(() => {
      updateUI();
    });
  });
  // ZIP code variation
  // temperature(apiURL, zip, apiKey).then(function (data) {
  //   postWeatherData(`http://localhost:3000/weatherData`, {
  //     temp: data.main.temp,
  //     weatherIcons: data.weather[0].icon,
  //     date: userDate,
  //     userFeelings: feelings,
  //     weatherDescription: data.weather[0].description,
  //   }).then(() => {
  //     updateUI();
  //   });
  // });
}

// Accessing OpenWeatherMap's API and grap the data
const temperature = async (apiURL, city, apiKey) => {
  const response = await fetch(apiURL + '&q=' + city + '&appid=' + apiKey);
  console.log(response);
  try {
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

// ZIP code variation
// const temperature = async (apiURL, zip, apiKey) => {
//   const response = await fetch(apiURL + '&zip=' + zip + '&appid=' + apiKey);
//   console.log(response);
//   try {
//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log('error', error);
//   }
// };

// Post function of the data retrived
const postWeatherData = async (url = '', data = {}) => {
  const request = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'Application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await request.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log('error', error);
  }
};

// Updating HTML content for the user to see
const updateUI = async () => {
  const request = await fetch(`http://localhost:3000/all`);
  try {
    const finalData = await request.json();
    document.querySelector('#date').innerHTML = finalData.date;
    document.querySelector('#temp').innerHTML = `${finalData.temp}°C`;

    // Just to add some styling
    document
      .querySelector('.weather-date')
      .setAttribute(
        'style',
        'border-right: 1px dashed black; background-color: rgba(69, 98, 104, 0.65);'
      );
    document.querySelector('#userFeelings').style.backgroundColor =
      'rgba(69, 98, 104, 0.65)';

    document.querySelector('#weatherDescription').innerHTML =
      finalData.weatherDescription;

    // Displaying weather's icon
    document.querySelector('#weatherIcons').style.display = 'block';
    document
      .querySelector('#weatherIcons')
      .setAttribute(
        'src',
        `http://openweathermap.org/img/wn/${finalData.weatherIcons}@4x.png`
      );

    document.querySelector('#userFeelings').innerHTML = finalData.userFeelings;
  } catch (error) {
    console.log('error', error);
  }
};
