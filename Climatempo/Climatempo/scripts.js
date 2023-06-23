const container = document.querySelector('.container');
const search = document.querySelector('.search-bar button');
const clima = document.querySelector('.clima');
const detalhes = document.querySelector('.detalhes');
const erro = document.querySelector('.erro-local');

search.addEventListener('click', () => {
    const APIkey = 'e06dd94c54eef02ddfd5ba0855d3a8f4';
    const city = document.querySelector('.search-bar input').value

    if(city === '') return;

    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + APIkey)
    .then(response => response.json())
    .then((data) => {
        console.log(data)
        if(data.length === 0){
            container.style.height = '550px';
            clima.style.display = 'none';
            detalhes.style.display = 'none';
            erro.style.display = 'block';
            erro.classList.add('fade-in');
            return;
        }else{
        var latitude = data[0].lat;
        var longitude = data[0].lon;
        fetch('https://api.openweathermap.org/data/3.0/onecall?lat='+latitude+'&lon='+longitude+'&appid=' + APIkey)
        .then(response => response.json())
        .then(json => {
            if(json.cod === '404'){
                container.style.height = '400px';
                clima.style.display = 'none';
                detalhes.style.display = 'none';
                erro.style.display = 'block';
                erro.classList.add('fadeIn');
                return;

            }
        })}
    })
});