app.factory('weatherService', function ($http) {
	return {
		getWeather: function () {
			var weather = {};
			$http.get('http://api.openweathermap.org/data/2.5/weather?q=NewYork,us&appid=44db6a862fba0b067b1930da0d769e98').success(function(data) {
				console.log(data)
				weather = data;
			});
			return weather;
		}
	};
});