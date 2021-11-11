const axios = require('axios');

/** 
 * Forward & Reverse Geocoding API from RapidAPI service..
 **/

const geoCodingAPI = (city, country, callBack) => {
    const geocodingAPIOptions = {
        method: 'GET',
        url: 'https://forward-reverse-geocoding.p.rapidapi.com/v1/forward',
        params: {
            city: city,
            country: country,
            'accept-language': 'en',
        },
        headers: {
            'x-rapidapi-host': 'forward-reverse-geocoding.p.rapidapi.com',
            'x-rapidapi-key': '1ddd6011f0msh87ef6a80c649f87p1d7618jsn368ecf7beebc'
        }
    };

    
    // make request here..
    axios.request(geocodingAPIOptions).then(response => {
        callBack(null, response.data[0]);

    }).catch(error => {
        callBack(error.message, null);
    });
};

module.exports = geoCodingAPI;