console.log(" ---> KievFridayCinema <--- ");

console.log(" Здравствуйте, господа! ");
const GetFilmData = () => {
	const CinemaData = {};

	const date = new Date();
	const day = date.toLocaleString('en', {day: '2-digit'});
	const month = date.toLocaleString('en', {month: '2-digit'});
	const year = date.toLocaleString('en', {year: 'numeric'});
	const weekday = date.toLocaleString('en', {weekday: 'long'});
	const today = day + month + year;
	console.log(' Сегодня ' + weekday);
	console.log(" Вашему вниманию предлагаются следующие фильмы: ");

	const needle = require('needle');
	const jsdom = require('jsdom');
	const { JSDOM } = jsdom;
	const URL = 'https://multiplex.ua/cinema/kyiv/prospect';

	needle.get(URL, function(err, data){
			if (err) throw err;
			const mltplxBody = new JSDOM(data.body);
			const mltplx = mltplxBody.window.document;
			const informarion_list = mltplx.querySelectorAll('.cinema_inside[data-date="' + today + '"] div.film');
		const informarion = Array.prototype.slice.call(informarion_list);

		console.log(' ==================== ');
		informarion.forEach(function(item){
			let film_list = item.querySelectorAll('div.info a');
			let film = Array.prototype.slice.call(film_list);
			let time_list = item.querySelectorAll('div.ns p.time');
			let time = Array.prototype.slice.call(time_list);

			function listAfter23 (){
				film.forEach(function(item){
					let name = item.textContent;
					let url_ = "https://multiplex.ua" + item.href;

					time.forEach(function(item){
						let seanceTime = item.textContent;
						let seanceTimeSplit = seanceTime.split(':')[0];
						if (seanceTimeSplit === '23' || seanceTimeSplit === '00') {
							console.log(' => ' + name);
							console.log(' => ' + url_);
							console.log('    ' + seanceTime);
							console.log(' ==================== ');
						}
					});
				});
			};

			function fullList () {
				film.forEach(function(item){
					let name = item.textContent;
					let url_ = "https://multiplex.ua" + item.href;
					console.log(' => ' + name);
					console.log(' => ' + url_);
					time.forEach(function(item){
						let seanceTime = item.textContent;
						let seanceTimeSplit = seanceTime.split(':')[0];
						if (seanceTimeSplit === '23' || seanceTimeSplit === '00') {
							console.log(' +  ' + seanceTime);
						}else{
							console.log('    ' + seanceTime);
						}
					});
					console.log(' ==================== ');
				});
			};

			if (weekday == 'Friday') {
				listAfter23();
			} else {
				fullList();
			}
		});

		console.log('  ');
		console.log(' Приятного просмотра! ');
		console.log('  ');
	});

	return CinemaData;
}
	//  console.log('----------------------------------------');
	// informarion.forEach(function(item){
	// 	let film_list = item.querySelectorAll('div.ns');
	// 	let film = Array.prototype.slice.call(film_list);
	// 	film.forEach(function(item){
	// 		let name = item.getAttribute('data-name');
	// 		let url_ = "https://multiplex.ua"+item.getAttribute('data-moviehref');
	// 		let time_list = item.querySelectorAll('p.time');
	// 		let time = Array.prototype.slice.call(time_list);
	// 		time.forEach(function(item){
	// 			let seanceTime = item.textContent;
	// 			let seanceTimeSplit = seanceTime.split(':')[0];
	// 			if (seanceTimeSplit === '23' || seanceTimeSplit === '00') {
	// 				console.log(' => ' + name);
	// 				console.log(' => ' + url_);
	// 				console.log(' => ' + seanceTime);
	// 				console.log('----------------------------------------');
	// 			}
	// 		});
	// 	});
	// });


// {
// 	date:
// 	content: [
// 		{
// 			title: 'asdfdasf'
//       link: 'asdfdasf'
//       time: ['12:21', '12:32']
// 		}
// 	]
// }