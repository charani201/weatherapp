function getWeather() {
    const location = document.getElementById('location').value.trim();
    if (!location) {
        showError('Please enter a location');
        return;
    }

    // Show loading message and hide previous results
    document.getElementById('loading').style.display = 'block';
    document.getElementById('weather-result').style.display = 'none';
    document.getElementById('error-message').style.display = 'none';

    const apiKey = '3e926ba35f6a4255a9791118252701';
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('loading').style.display = 'none';
            
            if (data.error) {
                showError(data.error.message);
            } else {
                showWeather(data);
            }
        })
        .catch(error => {
            document.getElementById('loading').style.display = 'none';
            showError('Something went wrong. Please try again later.');
        });
}

function showWeather(data) {
    document.getElementById('city-name').textContent = `${data.location.name}, ${data.location.country}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.current.temp_c}°C`;
    document.getElementById('condition').textContent = `Condition: ${data.current.condition.text}`;
    
    // Display the weather icon
    const icon = `https:${data.current.condition.icon}`;
    document.getElementById('weather-icon').innerHTML = `<img src="${icon}" alt="${data.current.condition.text}">`;

    document.getElementById('weather-result').style.display = 'block';
}

function showError(message) {
    document.getElementById('error-message').textContent = message;
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
}
