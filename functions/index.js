// https://www.youtube.com/watch?v=LOeioOKUKI8
const functions = require("firebase-functions");
const express = require("express");
const weatherRequest = require("./requests/weather.request");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (request, response) => {
  //response.set('Cache-Control', 'public, max-age=300, s-maxage-600');
  //response.send("Hello from Firebase! - Current date");
  response.render("index.ejs", { weather: null, error: null });
});

app.post("/", async (request, response) => {
  const { city } = request.body;
  const { weather, error } = await weatherRequest(city);
  response.render("index.ejs", { weather, error });
});

exports.app = functions.https.onRequest(app);

// https://stackoverflow.com/questions/40182121/whats-the-source-of-error-getaddrinfo-eai-again
// If you get this error with Firebase Cloud Functions, this is due to the limitations of the free tier

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// https://medium.com/@binyamin/creating-a-node-express-webpack-app-with-dev-and-prod-builds-a4962ce51334

// https://expressjs.com/en/guide/routing.html
// You define routing using methods of the Express app object that correspond to HTTP methods; for example, app.get()
// to handle GET requests

// http://expressjs.com/en/5x/api.html#res.render
// Renders a view and sends the rendered HTML string to the client. Optional parameters:
