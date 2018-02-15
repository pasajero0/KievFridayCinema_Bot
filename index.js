const GetFilmData = () => {
	const CinemaData = {};

	const date = new Date();
	const day = date.toLocaleString('en', {day: '2-digit'});
	const month = date.toLocaleString('en', {month: '2-digit'});
	const year = date.toLocaleString('en', {year: 'numeric'});
	const today = day + month + year;

	CinemaData.date = date;
	CinemaData.content = [];  

	const needle = require('needle');
	const jsdom = require('jsdom');
	const { JSDOM } = jsdom;
	const URL = 'https://multiplex.ua/cinema/kyiv/prospect';

	needle.get(URL, function(err, data){
		if (err) throw err;
		const mltplxBody = new JSDOM(data.body);
		const mltplx = mltplxBody.window.document;
		const information_list = mltplx.querySelectorAll('.cinema_inside[data-date="' + today + '"] div.film');
		const information = Array.prototype.slice.call(information_list);

		const info = information.map(function(item){
			const Movie = {};
			let film_list = item.querySelectorAll('div.info a');
			let film = Array.prototype.slice.call(film_list);
			let seance_list = item.querySelectorAll('div.ns p.time');
			let seance = Array.prototype.slice.call(seance_list);
			film.map(function(item){
				let name = item.textContent;
				let url_ = "https://multiplex.ua" + item.href;
				Movie.title = name;
				Movie.link = url_;
				Movie.time = [];
				seance.map(function(item){
					let seanceTime = item.textContent;
					Movie.time.push(seanceTime);
				});
			});
			return Movie;
		});
		console.log(info);
	}); 
	console.log();
	// CinemaData.content.push(info);
	console.log(CinemaData);
	return CinemaData;
}
GetFilmData();

// {
// 	date:
// 	content: [
// 		{
// 			title: ' '
//      	link: ' '
//      	time: ['12:21', '12:32']
// 		}
// 	]
// }