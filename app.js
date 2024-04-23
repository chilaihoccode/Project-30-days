const btnSearch = document.querySelector('.btn-search');
const inputSelector = document.querySelector('.search');

const apiKey = '9e98d2afffbeec9a73cd62ec0dd2ceb3'


const dataWeather = async (city) => {
    if(!city || city.startsWith(' ')) {
        document.querySelector('.error').style.display = 'flex'
        document.querySelector('.error').innerText = 'City not start with space'
        return
    }


    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`)
    const response = await data.json()
    console.log(response)

    if(response.cod === '404') {
        document.querySelector('.error').style.display = 'flex'
    }else {
        document.querySelector('.error').style.display = 'none'
        
            const imageWeather = document.querySelector('.weather-main');
            const Temperature = document.querySelector('.main-temp');
            const CityName = document.querySelector('.name');
            const Humidity = document.querySelector('.humidity p');
            const WindSpeed = document.querySelector('.wind-speed p'); 
            
        
        
            Temperature.innerText = Math.round(response.main.temp) + '°C' ;
            CityName.innerText = response.name;
            Humidity.innerText = response.main.humidity + "%";
            WindSpeed.innerText = response.wind.speed + "km/h";
            
            const mainWeather = response.weather[0].main;
        
        
            if(mainWeather === 'Clouds') {
                imageWeather.src = 'image/clouds.png'
            }else if (mainWeather === 'Rain') {
                imageWeather.src = 'image/rain.png'
            }else if (mainWeather === "Clear") {
                imageWeather.src = 'image/clear.png'
            }
        
            const WeatherDiv = document.querySelector('.weather-box');
            WeatherDiv.style.display = 'block'
    }


}


btnSearch.addEventListener('click',() => {
    dataWeather(inputSelector.value)
})
