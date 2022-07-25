//Open Weather api key:
//2396358254dfac1ceb90ea84bd38f8a3

let weather = {
    "weatherApiKey": "2396358254dfac1ceb90ea84bd38f8a3",
    "unsplashClientKey": "SzgB0JMMqnw3mSrm6wAUq0V1vq4pUWhhOUVDwWR1-7M",
    fetchWeather: function(city) { // created a fetchWeather function to fetch url
        fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.weatherApiKey}&units=imperial`
            ).then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) { // getting data from the openWeather api and named based on the openWeather api
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { sunrise, sunset } = data.sys;
        const { timezone } = data;

        //added moment library to convert Unix time to UTC time.
        const sunriseTime = moment.utc(sunrise, 'X').add(timezone, 'seconds').format('hh:mm A');
        const sunsetTime = moment.utc(sunset, 'X').add(timezone, 'seconds').format('hh:mm A');

        console.log(name, icon, description, temp, humidity, speed, sunrise, sunset, timezone);
        //updating the default HTML code
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = Math.round(temp) + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " mph";
        document.getElementById("sunrise-time").innerText = "Sunrise: " + sunriseTime;
        document.getElementById("sunset-time").innerText = "Sunset: " + sunsetTime;
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "/city')"
    },
    searchCity: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.searchCity();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        weather.searchCity();
    }
});

weather.fetchWeather("Atlanta"); //default city when page loads up