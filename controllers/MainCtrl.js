app.controller('MainCtrl', function ($scope, $http, $interval) {
	$scope.data = {
		current : {}, 
		news : [], 
		whethers : [
			{ icon: 'a', week:'sun', temperature1: 80, temperature2: 65, content: 'partly cloudy' },
			{ icon: 'b', week:'mon', temperature1: 90, temperature2: 76, content: 'rainy' },
			{ icon: 'c', week:'tue', temperature1: 85, temperature2: 70, content: 'sunny' },
			{ icon: 'd', week:'wen', temperature1: 90, temperature2: 80, content: 'cloudy' },
			{ icon: 'e', week:'tur', temperature1: 92, temperature2: 88, content: 'snowy' },
			{ icon: 'f', week:'fri', temperature1: 95, temperature2: 90, content: 'foggy sunny' }
		], 
		traffics : []
	};
	
	$scope.getNews = function () {
		$http.get('http://ajax.googleapis.com/ajax/services/search/news?v=1.0&q=a').success(function(response) {
			console.log(response)
			$scope.data.news = response.responseData.results;
		});
	};
	$scope.getNews();
	
	$scope.getWeather = function () {
		$http.get('http://api.openweathermap.org/data/2.5/weather?q=NewYork,us&appid=44db6a862fba0b067b1930da0d769e98').success(function(response) {
			// console.log(response)
			if (response) {
				if (response.main) {
					$scope.data.current.temp_min = response.main.temp_min;
					$scope.data.current.temp_max = response.main.temp;
					$scope.data.current.weather_description = response.weather[0].description;
				}
			}
		});
	};
	$scope.getWeather();
	
	monthStrings = 'January,February,March,Aril,May,June,July,August,September,October,November,December'.split(',');
	weekStrings = 'Sunday,Monday,Tuesday,Wednsday,Thursday,Friday,Saturday'.split(',');
	$scope.setTimePanel = function () {
		now = new Date();
		h = now.getHours();
		m = now.getMinutes();
		
		$scope.data.current.dateval = monthStrings[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear();
		$scope.data.current.timeval = (h % 12 < 10 ? '0' : '') + (h > 12 ? h - 12 : h) + ':' + (m * 1 < 10 ? '0' : '') + m + ' ' + (h > 12 ? 'PM' : 'AM');
		$scope.data.current.weekday = weekStrings[now.getDay()];
	};
  $scope.setTimePanel();
	$interval(function () { $scope.setTimePanel(); }, 1000);
});
