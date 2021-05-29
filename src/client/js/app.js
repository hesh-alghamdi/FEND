const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log('error', error);
  }
};

function handleSubmit(event) {
  event.preventDefault();
  // Data provided by the user
  const destination = document.querySelector('#destination').value;
  const departure = document.querySelector('#departure').value;
  const returning = document.querySelector('#returning').value;
  const planning = document.querySelector('#planning');
  // Moment.js to manipulate date
  const departureMoment = moment(departure, 'YYYY-MM-DD');
  const returningMoment = moment(returning, 'YYYY-MM-DD');
  let daysCount = returningMoment.diff(departureMoment, 'days') + 1;
  const todayDate = moment().format('YYYY-MM-DD');

  const dateInfo = {
    departure: departure,
    returning: returning,
    daysCount: daysCount,
  };

  // reportValidity()
  const departureMomentValid = document
    .querySelector('#departure')
    .reportValidity();
  const returningMomentValid = document
    .querySelector('#returning')
    .reportValidity();

  // Check if inputs are valid
  if (
    daysCount <= 0 ||
    departureMoment.isBefore(todayDate) ||
    returningMoment.isBefore(todayDate)
  ) {
    alert(`Please, enter valid dates.`);
  } else if (
    destination.length > 0 &&
    departureMomentValid &&
    returningMomentValid
  ) {
    // Show a pop-up to tell the user if thier data is processing
    // credit https://www.npmjs.com/package/toastify-js
    {
      Toastify({
        text: 'Your data is processing.',
        duration: 2500,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'center',
        backgroundColor: 'rgba(98, 149, 156, 0.741)',
      }).showToast();
      console.log(departure, returning);
      postData('http://localhost:8000/results', {
        destination: destination,
      }).then((data) => {
        updateUI(data, dateInfo);
        // reset tge form
        document.querySelector('form').reset();
      });
    }
  } else {
    alert('Please, fill the input fields.');
  }
}
// Global varibale to count how many cards are posted
let cardsCountCreation = 0;

const updateUI = (data, dateInfo) => {
  console.log(data);
  const planSection = document.querySelector('#plans');
  let currentCard;
  // Creating cards
  const card = createNewEleClass('div', `card card${cardsCountCreation}`, '');
  currentCard = card;

  // First element (#destination-results)

  const cityCountry = createNewEle(
    'p',
    'city-country',
    `<span>${lowerCase(data.destination)}</span>, <span>${data.country}</span>`
  );

  // Second div (#dates)
  // Tried using my function createNewEle for my spans but it alwayes gives
  // [object HTMLSpanElement] as a text in my html. couldn't find a solution, so I had to do it manually
  const dates = createNewEle('div', 'dates', '');
  if (dateInfo.daysCount === 1) {
    dates.innerHTML = `Your trip starts on <span>${dateInfo.departure}</span><br> And ends on <span>${dateInfo.returning}</span> <br/> Your trip is <span>${dateInfo.daysCount}</span> day long`;
  } else {
    dates.innerHTML = `Your trip starts on <span>${dateInfo.departure}</span><br> And ends on <span>${dateInfo.returning}</span> <br/> Your trip is <span>${dateInfo.daysCount}</span> days long`;
  }

  // Third div (#destinationImage)
  const destination_image = createNewEle('div', 'destination-image', '');
  if (data.destinationImage === 'No images were found!') {
    destination_image.innerHTML = `<img src="" alt="No images of ${data.destination} were found!" id="img-url">`;
  } else {
    destination_image.innerHTML = `<a href="${data.destinationImage}" target="_blank"><img src="${data.destinationImage}" alt="Picture of ${data.destination}." id="img-url"></a>`;
  }

  // Fourth div (#forecast)
  const currentforecast = createNewEle('div', 'current-forecast', '');
  const currentforecast_title = createNewEle(
    'h4',
    'current-forecast-title',
    `Today's forecast`
  );
  const currentforecast_temp = createNewEle(
    'p',
    'current-forecast',
    `Temperature<br><span>${data.temp} °C</span>`
  );
  const currentforecast_icon = createNewEle('img', 'forecast-icon', '');
  currentforecast_icon.setAttribute(
    'src',
    `https://www.weatherbit.io/static/img/icons/${data.icon}.png`
  );
  const currentforecast_desc = createNewEle(
    'p',
    'current-forecast-desc',
    data.description
  );
  // To automate appending
  const forecastAppendList = [
    currentforecast_title,
    currentforecast_temp,
    currentforecast_icon,
    currentforecast_desc,
  ];
  for (let i = 0; i < forecastAppendList.length; i++) {
    appendNewEle(currentforecast, forecastAppendList[i]);
  }
  const predictedforecast = createNewEle('div', 'predicted-forecast', '');
  const predictedforecast_title = createNewEle(
    'h4',
    'predicted-forecast-title',
    `forecast of 16 days`
  );
  const predicted_temp = createNewEle(
    'p',
    'predicted-forecast',
    `Average Temperature<br><span>${data.avgTemp} °C</span>`
  );
  const predicted_maxTemp = createNewEle(
    'p',
    'predicted-max-forecast',
    `Max Temperature<br><span>${data.maxTemp} °C</span>`
  );
  const predicted_minTemp = createNewEle(
    'p',
    'predicted-max-forecast',
    `Min Temperature<br><span>${data.minTemp} °C</span>`
  );
  // Append the new data to predictedforecast
  const prdictedAppendList = [
    predictedforecast_title,
    predicted_temp,
    predicted_maxTemp,
    predicted_minTemp,
  ];
  for (let i = 0; i < prdictedAppendList.length; i++) {
    appendNewEle(predictedforecast, prdictedAppendList[i]);
  }

  // Sixth div (#planning)
  let planningDiv = '';
  if (planning.textLength > 0) {
    planningDiv = createNewEle('div', 'planning-result', `${planning.value}`);
  }
  // Delete card button
  const button = createNewEleClass(
    'button',
    `button card${cardsCountCreation}`,
    '<i class="fas fa-times"></i>'
  );
  // I tried for 6 hours straight to use event listener to do this
  // then I stumbled upon https://stackoverflow.com/a/64226108/14869876 and he saved me
  button.setAttribute('onclick', 'return this.parentNode.remove();');
  const eleList = [
    cityCountry,
    dates,
    destination_image,
    currentforecast,
    predictedforecast,
    button,
  ];
  if (planning.textLength > 0) {
    eleList.splice(eleList.length - 1, 0, planningDiv);
  }

  // Appending the card to the page
  appendNewEle(planSection, currentCard);
  for (let i = 0; i < eleList.length; i++) {
    appendNewEle(currentCard, eleList[i]);
  }
  cardsCountCreation = cardsCountCreation + 1;
};
// Event listener to delete cards

// Credit: https://stackoverflow.com/a/57589712/14869876
function lowerCase(str) {
  return str
    .split(' ')
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase())
    .join(' ');
}

// function to create new elements with ID
function createNewEle(tag, type, content) {
  const newEle = document.createElement(`${tag}`);
  newEle.setAttribute('id', `${type}`);
  newEle.innerHTML = `${content}`;
  return newEle;
}
function createNewEleClass(tag, type, content) {
  const newEle = document.createElement(`${tag}`);
  newEle.setAttribute('class', `${type}`);
  newEle.innerHTML = `${content}`;
  return newEle;
}

function appendNewEle(parent, child) {
  parent.appendChild(child);
}

export { handleSubmit };
