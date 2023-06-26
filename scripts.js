const container = document.querySelector('.container');
const input = document.querySelector('.search-bar input') 
const search = document.querySelector('.search-bar button');
const clima = document.querySelector('.clima');
const detalhes = document.querySelector('.detalhes');
const erro = document.querySelector('.erro-local');

input.addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
        search.click();
    }
});

search.addEventListener('click', () => {
    const APIkey = 'e06dd94c54eef02ddfd5ba0855d3a8f4';
    const city = document.querySelector('.search-bar input').value
    search.style.opacity = '0';

    if(city === '') {
        search.style.opacity = '1';
        container.style.height = '130px';
        return
    }
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + APIkey)
    .then(response => response.json())
    .then((data) => {
        if(data.length === 0){
            search.style.opacity = '1';
            container.style.height = '550px';
            clima.style.display = 'none';
            detalhes.style.display = 'none';
            erro.style.display = 'block';
            erro.classList.add('fade-in');
            return;
        }
            search.style.opacity = '1';
            erro.style.display = 'none';
            erro.classList.remove('fade-in');
            container.style.height = '130px';
        var latitude = data[0].lat;
        var longitude = data[0].lon;
        fetch('https://api.openweathermap.org/data/3.0/onecall?lat='+latitude+'&lon='+longitude+'&appid=' + APIkey)
        .then(response => response.json())
        .then(json => {
            console.log(json)
            const image = document.querySelector('.clima img');
            const temperatura = document.querySelector('.clima .temperatura');
            const umidade = document.querySelector('.detalhes .umidade span');
            const vento = document.querySelector('.detalhes .vento span');
            switch(json.current.weather[0].main){
                case 'Clear':
                    image.src = 'img/sol.png';
                    break;
                case 'Clouds':
                    image.src = 'img/nuvem.png';
                    break;
                case 'Rain':
                    image.src = 'img/chuva.png';
                    break;
                case 'Haze':
                    image.src = 'img/neblina.png';
                    break;
                default:
                    image.src = '';
            }

            temperatura.innerHTML = `${parseInt(json.current.temp - 273)}<span>ºC</span>`;
            umidade.innerHTML =  `${json.current.humidity}%`
            vento.innerHTML = `${json.current.wind_speed} Km/h`

            clima.style.display = '';
            detalhes.style.display = '';
            clima.classList.add('fade-in');
            detalhes.classList.add('fade-in');
            container.style.height = '490px';




        });
    });
});