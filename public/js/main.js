console.log('This is Client\'s JS file!');


// fetch API with 1st way..
// fetch(`http://localhost:8000/weather?city=${city}&country=${country}`).then(res => res.json())
//     .then(data => console.log(data))
//     .catch(err => console.log(`ERROR : ${err}`));


// fetch API with 2nd way..
// fetch(`http://localhost:8000/weather?city=${city}&country=${country}`).then((response) => {
//     response.json().then(data => {
//         if (data.error) throw console.log(data.error);
//         console.log(data);

//     }).catch(error => {
//         console.log(`ERROR : ${error}`);
//     });
// });


// Accual Work..
const weatherForm = document.querySelector('form');
const city = document.querySelector('#city');
const country = document.querySelector('#country');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');
const message3 = document.querySelector('#message-3');
const message4 = document.querySelector('#message-4');
const message5 = document.querySelector('#message-5');
const message6 = document.querySelector('#message-6');
const message7 = document.querySelector('#message-7');
const message8 = document.querySelector('#message-8');

// when clicked for submit the form..
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const cityValue = city.value;
    const countryValue = country.value;

    message1.textContent = "Loading...";
    message2.textContent = "";
    message3.textContent = "";
    message4.textContent = "";
    message5.textContent = "";
    message6.textContent = "";
    message7.textContent = "";
    message8.textContent = "";

    // fetch API with client's value..
    fetch(`http://localhost:8000/weather?city=${cityValue}&country=${countryValue}`).then((response) => {
        response.json().then(weatherResponse => {
            if (weatherResponse.error) throw console.log(weatherResponse.error);
            // result's with object..
            console.log(weatherResponse);

            // destructuring the all values here..
            const {
                city_name,
                weather,
                snow,
                temp,
                precip,
                pod,
                datetime,
                wind_cdir_full,
                vis,
                timezone
            } = weatherResponse.data;

            // showing the values..
            message1.textContent = `${city_name} city - ${weather.description}`;
            message2.textContent = `Temperature - ${temp} Deg Celcius`;
            message3.textContent = ` Rain precipitation - ${precip}%`;
            message4.textContent = `Snow - ${snow} mm/hr`;
            message5.textContent = `Verbal wind direction - ${wind_cdir_full}`;
            message6.textContent = `Visibility - ${vis} KM`;
            message7.textContent = `At : ${pod === 'd' ? 'Day' : 'Night'} = ${datetime}`;
            message8.textContent = `Timezone - ${timezone}`;


        }).catch(error => {
            console.log(`ERROR : ${error}`);
            // show error message..
            message1.textContent = error.message;
        });
    });
});
