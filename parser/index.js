const getFilmData = () => {
	
	const date = new Date();
	const day = date.toLocaleString('en', {day: '2-digit'});
	const month = date.toLocaleString('en', {month: '2-digit'});
	const year = date.toLocaleString('en', {year: 'numeric'});
	const today = day + month + year;

	// CinemaData.date = date;
	// CinemaData.content = [];

	const needle = require('needle');
	const jsdom = require('jsdom');
	const { JSDOM } = jsdom;
	const URL = 'https://multiplex.ua/cinema/kyiv/prospect';

	return needle('get', URL).then(function(data){
		const mltplxBody = new JSDOM(data.body);
		// console.log('mltplxBody', mltplxBody);
		const mltplx = mltplxBody.window.document;
		const information_list = mltplx.querySelectorAll('.cinema_inside[data-date="' + today + '"] div.film');
		const information = Array.prototype.slice.call(information_list);

		const content = information.map(function(item){
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
		// console.log('info ====> ', content);
		return { date, content };
	}).catch((err) => { console.log('=>>>>>', err) })
	// CinemaData.content.push(info);
}

getFilmData().then((res)=>{
	console.log(`CinemaData ====> ${JSON.stringify(res)}`);
});

module.exports = getFilmData;
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
