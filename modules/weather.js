import {areCoordinatesInvalid} from "./validation.js";

const ABSOLUTE_ZERO = -273;
const ZOOM_POWER = 8;
const API_KEY = 'cc21956d7e6239a65a26b256182825a4';

var buttonList = [];

window.showWeather = function() {
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    if (areCoordinatesInvalid(latitude, longitude)) {
        document.getElementById('error').innerText = 'Введены некорректные значения';
        return;
    }
    document.getElementById('error').innerText = '';
    requestWeather(latitude, longitude);
}

function addWeatherCard(data, id) {
    document.getElementById('weatherCardList').innerHTML += `<div class="weatherCard">
        <div id="lat">Широта: ${data.coord.lat}</div>
        <div id="lon">Долгота: ${data.coord.lon}</div>
        <div id="temperature">Температура: ${Math.floor(data.main.temp + ABSOLUTE_ZERO)}°</div>
        <div id="windSpeed">Скорость ветра: ${data.wind.speed} м/c</div>
        <img class="weatherIcon" src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="weatherIcon">
        <button class="mapButton" id="${id}">Карта</button>
        <button class="removeButton" onclick="this.parentNode.remove()">Удалить</button>
    </div>`;
}

function requestWeather(latitude, longitude) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&` + `lon=${longitude}&appid=${API_KEY}`;
    const id = crypto.randomUUID();
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            addWeatherCard(data, id);
            map.setCenter([data.coord.lat, data.coord.lon], ZOOM_POWER);
            buttonList.push({id: id, latitude: data.coord.lat, longitude: data.coord.lon});
            buttonList.map((button) => {
                document.getElementById(button.id)?.addEventListener('click', () => {
                    map.setCenter([button.latitude, button.longitude], ZOOM_POWER);
                }, false);
            })
        });
}