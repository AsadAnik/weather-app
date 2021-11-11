const axios = require('axios');

/** 
 * Weather API from RapidAPI service..
 * which is alternative of darksky.net/dev API..
 **/

const weatherAPI = (lat, lon, callBack) => {
    const weatherAPIOptions = {
        method: 'GET',
        // minutely..
        // url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/minutely',
        // currently..
        url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
        params: { lat: lat, lon: lon, units: 'M', lang: 'en' },
        headers: {
            'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com',
            'x-rapidapi-key': '1ddd6011f0msh87ef6a80c649f87p1d7618jsn368ecf7beebc'
        }
    };

    // make request here to API..
    axios.request(weatherAPIOptions).then((response) => {
        callBack(null, response.data.data[0]);

    }).catch(error => {
        callBack(error.message, null)
    });
};

module.exports = weatherAPI;