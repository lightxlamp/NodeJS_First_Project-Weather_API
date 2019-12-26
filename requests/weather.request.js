var requestPromise = require('request-promise');

module.exports = async function (city = '') {
    if(!city)
    {
        console.log('City should be filled')        
    }
    console.log('City: ', city)

    const API_KEY = '5a45af6db4cf594247d3e6a462360b21'
    //const API_KEY = '8ddb2ae4d480545c1441bb2374c9ff6d'
    const URI = 'http://api.openweathermap.org/data/2.5/weather'

    const options = {
        uri: URI, 
        querySearch: {
            appid: API_KEY,
            q: city,
            units: 'imperial'
        },
        json: true
    }

    // const resp = await requestPromise(options)
    // console.log(resp)

    try {
        const data = await requestPromise(options)
        const celsius = (data.main.temp - 32) * 5/9;

        return{
            weather: `${data.name}: ${celsius.toFixed(0)}`,
            error: null
        }
    } 
    catch (error) {
        console.log(error.error.message)
        return { 
            weather: null,
            error: error.error.message
        }
    }

    // var unirest = require("unirest");

    // var req = unirest("POST", "https://accuweatherstefan-skliarovv1.p.rapidapi.com/get24HoursConditionsByLocationKey");

    // req.headers({
    //     "x-rapidapi-host": "AccuWeatherstefan-skliarovV1.p.rapidapi.com",
    //     "x-rapidapi-key": "4a0ac4212cmsh35f41b479108785p1a8667jsn4d53cd848a6c",
    //     "content-type": "application/x-www-form-urlencoded"
    // });

    // req.form({});

    // req.end(function (res) {
    //     if (res.error) throw new Error(res.error);

    //     console.log(res.body);
    // });
}  