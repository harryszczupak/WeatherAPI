const button = document.querySelector('.btn');
let weather = {
	apiKey: 'd3401127850f8ee7e9bba4b89e61e92b',
	fetchWeather: function (value) {
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${this.apiKey}`
		)
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error(`${res.status}`);
				}
			})
			.then((data) => this.diplayWeather(data))
			.catch((Error) => (document.querySelector('h2').innerText = Error));
	},
	diplayWeather(data) {
		const { lon, lat } = data.coord;
		const { name } = data;
		const { description } = data.weather[0];
		const { temp, humidity } = data.main;
		const celcius = temp - 273.15;
		const { speed } = data.wind;

		document.querySelector('h2').innerText = 'Weather in ' + name;
		document.querySelector('span').innerText = Math.floor(celcius) + '℃';
		document.querySelector('.description').innerText = description;
		document.querySelector('.humidity').innerText =
			'humidity: ' + humidity + '%';
		document.querySelector('.wind').innerText = 'Wind speed: ' + speed + 'km/h';
		document.querySelector('.geolokalization').innerText =
			'height: ' + lat + ', width: ' + lon;
	},
	search: function () {
		this.fetchWeather(document.querySelector('input').value);
	},
};

button.addEventListener('click', function () {
	weather.search();
});
const openMap = document.querySelector('.open_map');
openMap.addEventListener('click', function () {
	const map = window.open(
		`https://www.google.pl/maps/`,
		'__self',
		'left= 100 width=500 height=500'
	);
});
