# FEND Capstone - Travel App

This project is the last project in the "Front-End Web Develpment" nanodegree that Udacity is providing.

## About the project

This project is focusing on using APIs and fetching data from them based on what the user is inputting.

## What APIs are being used

- Weatherbit API - to get future and current forecast of the provided destination by the user.
- Geonames API - to get information about the provided destination such as country name, longitude and latitude.
- Pixabay API - to display a picture of that destination.

## [Application link hosted on Heroku](https://hesh-traveling-app.herokuapp.com/)

## How to run the project locally

1. You have to have Node.js installed and running on your device.
1. Download/clone this repository and cd to it via your terminal.
1. Once inside the project's folder, type into your terminal `npm install`.
1. You need now to get a key to each API to get it working. [See here](#How-to-set-API-keys)
1. Then type `npm run build-prod`.
1. Now, you'll notice a new folder has been added to the directory called `dist`. This means that my project just initialized the local files of the site.
1. Now, type `npm run start` into your terminal. You'll be told which port is listend to to access it.
1. Finally, go to you browser and type in the link field `localhost:<port>` and press enter.

## How to set API keys

Go to these sites and make an account: [Weatherbit](https://www.weatherbit.io/), [Geonames](http://www.geonames.org/) and [Pixabay](https://pixabay.com/).

Once you obtain your keys, go to the directory of the project and create a file and name it `.env` and copy these lines inside it:

```
WEATHERBIT_KEY=  XXXXXXXXXXXXXX
GEONAMES_USERNAME= XXXXXXXXXXXXXX
PIXABAY_KEY= XXXXXXXXXXXXXX
PORT= 8000
```

Replace `XXXXXXXXXXXXXX` with the key from the website. Keep in mind, `GEONAMES_USERNAME` is the same as your login name to Geonames website. Also, port number can be whatever you want.

## What to add to the project

- Deploying it to Heroku, Netlify or both. **(DONE ✔️)**
- Adding `localStorage` element to save session's data for future visits.
- Adding [html2canvas](https://html2canvas.hertzen.com/) as an option for the user to save his plan as an image that he can download.
