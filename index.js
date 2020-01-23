// https://medium.com/@binyamin/creating-a-node-express-webpack-app-with-dev-and-prod-builds-a4962ce51334
const express = require('express');
const bodyParser = require('body-parser')
const weatherRequest = require('./requests/weather.request')

const app = express(); 

app.set('view engine', 'ejs')
app.use(express.static('public')) 
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (request, response) => {
    response.render('index.ejs', {weather: null, error: null})
})

app.post('/', async (request, response) => {
    const {city} = request.body; 
    const {weather, error} = await weatherRequest(city)
    response.render('index.ejs', {weather, error})
})

app.listen(1789, () => {
    console.log('Server running on port 1789')
});