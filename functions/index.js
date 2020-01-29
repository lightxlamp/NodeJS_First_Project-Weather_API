// https://www.youtube.com/watch?v=LOeioOKUKI8
const functions = require('firebase-functions');
const express = require('express');
const engines = require('consolidate');
const firebase = require('firebase-admin');

const app = express(); 
const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);

function getFacts() {
    const ref = firebase.database().ref('facts');
    return ref.once('value').then(snap => snap.val());
}

app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', (request, response) => {
    response.set('Cache-Control', 'public, max-age=300, s-maxage-600');
    // response.send("Hello from Firebase! - Current date");
    getFacts().then(facts => {
        response.render('index', {facts} );
    });
});

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.https.onRequest(app);