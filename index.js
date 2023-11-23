let currCity = "Sofia";
let units = "metric"

let city = document.querySelector (".city");
let datetime = document.querySelector(".datetime");
let forecast = document.querySelector('.forecast');
let temperature = document.querySelector('.temperature');
let icon = document.querySelector('.icon');
let minmax = document.querySelector('.minmax')
let realfeel = document.querySelector('.realfeel');
let humidity = document.querySelector('.humidity');
let wind = document.querySelector('.wind');
let pressure = document.querySelector('.pressure');


document.querySelector('.search').addEventListener('submit', e => {
    let search = document.querySelector('.searchform');
    e.preventDefault();
    currCity = search.value;
    getWeather();
    search.value=''

})

document.querySelector('.unit_celsius').addEventListener('click', () => {
    if(units !=='metric'){
        units ='metric'
        getWeather()
    }
})

document.querySelector('.unit_farenheit').addEventListener('click', () => {
    if(units !=='imperial'){
        units ='imperial'
        getWeather()
    }
})

function convertTimeStamp(timestamp, timezone) {
    const convertTimezone = timezone / 3600;
    const date = new Date(timestamp * 1000);

    const options = {
        weekday:'long',
        day:'numeric',
        month:'long',
        year:'numeric',
        hour:'numeric',
        minute:'numeric',
        timeZone: `Etc/GMT${convertTimezone >= 0 ? '-' : '+'}${Math.abs(convertTimezone)}`,
        hour12:true
    }
    return date.toLocaleString('en-US', options)
}


function convertCountryCode(country) {
    let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
    return regionNames.of(country)
}

function getWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=a96c91391e91a1b0e3d29fbc82dcca24&units=${units}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`;
            datetime.innerHTML = convertTimeStamp(data.dt, data.timezone);
            temperature.innerHTML = `${data.main.temp.toFixed()}&#176;`;
            icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="Weather Icon" />`;
            minmax.innerHTML = `<p>Min ${data.main.temp_min.toFixed()}&#176;</p>
                                <p>Max: ${data.main.temp_max.toFixed()}&#176;</p>`;
            realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176;`;
            humidity.innerHTML = `${data.main.humidity}%`;
            wind.innerHTML = `${data.wind.speed} ${units === 'imperial' ? 'mph' : 'm/s'}`;
            pressure.innerHTML = `${data.main.pressure} hPa`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            // Handle the error, e.g., display an error message on the UI
        });
}


document.body.addEventListener('load', getWeather())