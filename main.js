const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener('click', () => {
    const APIKey = "5f1077f561d87b1be334b15838fc01b4";
    const city = document.querySelector(".search-box input").value;

    if (city == '') 
        return;
    

    // console.log(city);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)
        .then((response) => response.json())
        .then((json) => {

            if (json.cod === "404") {
                container.style.height = "400px";
                weatherBox.classList.remove("active");
                weatherDetails.classList.remove("active");
                error404.classList.add("active");
                return;
            }

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            console.log(json);
            container.style.height = "555px";
            container.classList.add("active");
            weatherBox.classList.add("active");
            weatherDetails.classList.add("active");
            error404.classList.remove("active");

            switch (json.weather[0].main) {
                case "Clear":
                    image.src = "./images/image-removebg-preview.png";
                    break;

                case "Rain":
                    image.src = "./images/image-removebg-preview (4).png";
                    break;

                case "Snow":
                    image.src = "./images/image-removebg-preview (2).png";
                    break;

                case "Clouds":
                    image.src = "./images/image-removebg-preview (5).png";
                    break;

                case "Mist":
                    image.src = "./images/image-removebg-preview (3).png";
                    break;

                case "Haze":
                    image.src = "./images/image-removebg-preview (1).png";
                    break;
                default:
                    image.src = "./images/image-removebg-preview.png";
                   

            }
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        });
});