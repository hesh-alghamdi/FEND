function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById('url').value;

  if (Client.checkForURL(formText)) {
    console.log('Link is submitted successfully!');

    postData('/api', { url: formText }).then(function (
      response
    ) {
      document.querySelector('#agreement-results').innerHTML = `${lowerCase(
        response.agreement
      )}`;
      document.querySelector('#subjectivity-results').innerHTML = `${lowerCase(
        response.subjectivity
      )}`;
      document.querySelector(
        '#confidence-results'
      ).innerHTML = `${response.confidence}`;

      document.querySelector('#score-results').innerHTML = `${
        response.score_tag
      }${score(response.score_tag)}`;
    });
  } else {
    alert('Invalid URL!');
  }
}

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
    console.log(newData);
    return newData;
  } catch (error) {
    console.log('error', error);
  }
};
// Credit: https://stackoverflow.com/a/57589712/14869876
function lowerCase(str) {
  return str
    .split(' ')
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase())
    .join(' ');
}

// Credit to: https://github.com/MeaningCloud/meaningcloud-python/blob/master/meaningcloud/SentimentResponse.py
// It dosn't show in the documentation. In the link above, you can see it in the last function of the code
function score(text) {
  let tag;
  switch (text) {
    case 'P+':
      tag = ' (Very Positive)';
      break;
    case 'P':
      tag = ' (Positive)';
      break;
    case 'NEU':
      tag = ' (Netural)';
      break;
    case 'N':
      tag = ' (Negative)';
      break;
    case 'N+':
      tag = ' (Very Negative)';
      break;
    case 'NONE':
      tag = ' (No Sentiment)';
      break;
  }
  return tag;
}

export { handleSubmit };
