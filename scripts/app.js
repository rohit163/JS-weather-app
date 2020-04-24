const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateUI = (data) => {
    // const cityDets = data.cityDets;
    // const weather = data.weather;

    //destructure proprerties
    const {cityDets , weather } = data;
    
    //update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
                <div class="my-3">${weather.WeatherText}</div>
                <div class="display-4 my-4">
                <span>${weather.Temperature.Metric.Value}</span>
                <span> &deg;C</span>
            </div>
    `;
    
    //update the night and day & icon img

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src' , iconSrc);

    
    let timeSrc = weather.IsDayTime?'img/day.svg':'img/night.svg';
    
    time.setAttribute('src' , timeSrc);

    //remove d-none calss if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

}

const updateCity = async (city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
        cityDets, weather
    };
};



cityForm.addEventListener('submit', e => {
    //prevent the default func
    e.preventDefault();

    //get the city value
    const City = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with new city
    updateCity(City)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

        //set local storage
        localStorage.setItem('city' , city);
});

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}