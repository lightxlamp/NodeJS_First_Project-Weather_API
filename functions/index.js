// https://www.youtube.com/watch?v=LOeioOKUKI8
const functions = require('firebase-functions');
const express = require('express');
// const engines = require('consolidate');
// const firebase = require('firebase-admin');
// const path = require("path");
// const bodyParser = require('body-parser')
const weatherRequest = require('./requests/weather.request')

const app = express(); 
// const firebaseApp = firebase.initializeApp(
//     functions.config().firebase
// );

// function getFacts() {
//     const ref = firebase.database().ref('facts');
//     return ref.once('value').then(snap => snap.val());
// }

//app.engine('hbs', engines.handlebars);
app.use(express.static(__dirname + '/public'));
//console.log('Dirname:', __dirname);
app.set('view engine', 'ejs')
app.set('views', './views');
//app.set('view engine', 'hbs');

app.get('/', (request, response) => {
    //response.set('Cache-Control', 'public, max-age=300, s-maxage-600');
    //response.send("Hello from Firebase! - Current date");
    response.render('index.ejs', {weather: null, error: null});
});

app.post('/', async (request, response) => {
    const {city} = request.body; 
    const {weather, error} = await weatherRequest(city)
    response.render('index.ejs', {weather, error})
});

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.https.onRequest(app);

/// !---
// https://medium.com/@binyamin/creating-a-node-express-webpack-app-with-dev-and-prod-builds-a4962ce51334

// app.use(express.static('public')) 
// app.use(bodyParser.urlencoded({extended: true}))
// app.set('views', path.join(__dirname, 'views'));
// console.log(path.join(__dirname, 'views'));

// https://expressjs.com/en/guide/routing.html
// You define routing using methods of the Express app object that correspond to HTTP methods; for example, app.get() to handle GET requests