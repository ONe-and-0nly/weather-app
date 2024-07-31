async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = '0b3365cd9ef471c8c5916eeba8436bb7';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod === 200) {
        displayWeather(data);
        document.querySelector('.weather-left').classList.add('active');
        document.querySelector('.weather-right').classList.add('active');
        document.getElementById('search-button').classList.add('clicked');
    } else {
        alert('City not found');
    }
}

function displayWeather(data) {
    const dateTime = new Date().toLocaleString();
    document.getElementById('datetime').innerText = `Date and Time: ${dateTime}`;

    document.getElementById('temperature').innerText = `${data.main.temp}°C`;
    document.getElementById('feels-like').innerText = `Feels Like: ${data.main.feels_like}°C`;
    document.getElementById('temp-range').innerHTML = `Max: ${data.main.temp_max}°C <span style="color: red;">↑</span> | Min: ${data.main.temp_min}°C <span style="color: blue;">↓</span>`;

    document.getElementById('clouds').innerText = `Cloud Cover: ${data.clouds.all}%`;
    document.getElementById('precipitation').innerText = `Precipitation: ${data.rain ? data.rain['1h'] : 0} mm`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById('uvi').innerText = `UV Index: ${data.uvi}`;
    document.getElementById('visibility').innerText = `Visibility: ${data.visibility / 1000} km`;
    document.getElementById('windspeed').innerText = `Wind Speed: ${data.wind.speed} m/s`;
    document.getElementById('sunrise').innerText = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
    document.getElementById('sunset').innerText = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
}

document.getElementById('city').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});