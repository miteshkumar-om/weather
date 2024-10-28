document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchButton').addEventListener('click', fetchWeather);

    async function fetchWeather() {
        const city = document.getElementById('cityInput').value;
        const apiKey = 'cfe108909ebda3c8d51b00758f345ec5';
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const weatherResponse = await fetch(weatherUrl);
            if (!weatherResponse.ok) {
                throw new Error('City not found');
            }
            const weatherData = await weatherResponse.json();
            const timezoneOffset = weatherData.timezone; // Timezone offset in seconds
            const localTime = new Date((new Date()).getTime() + timezoneOffset * 1000).toLocaleTimeString('en-GB', { timeZone: 'UTC' });

            displayWeather(weatherData, localTime);
        } catch (error) {
            document.getElementById('weatherDisplay').innerHTML = `<p>${error.message}</p>`;
        }
    }

    function displayWeather(weatherData, localTime) {
        const weatherDisplay = document.getElementById('weatherDisplay');
        const temperature = weatherData.main.temp;
        const humidity = weatherData.main.humidity;
        const description = weatherData.weather[0].description;
        const icon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;

        weatherDisplay.innerHTML = `
            <h2>Weather in ${weatherData.name}</h2>
            <img src="${icon}" alt="${description}">
            <p>Temperature: ${temperature}°C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Condition: ${description}</p>
            <p>Local Time: ${localTime}</p>
        `;
    }
});