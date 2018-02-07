console.log(" ---> KievFridayCinema Bot <--- ");

console.log(" Здравствуйте, господа! ");

// var date = new Date();
// var options = {
// 	weekday: 'long',
// 	year: 'numeric',
// 	month: 'numeric',
// 	day: 'numeric',
// 	timezone: 'UTC'
// };
// var nowDate = date.toLocaleString("en", options);
// console.log(' В этот день: ' + nowDate);

console.log(" Вашему вниманию предлагаются следующие фильмы: ");

const needle = require('needle');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const URL = 'https://multiplex.ua/cinema/kyiv/prospect';

needle.get(URL, function(err, data){
    if (err) throw err;
    const mltplxBody = new JSDOM(data.body);
    const mltplx = mltplxBody.window.document;

    var informarion_list = mltplx.querySelectorAll('.cinema_inside[data-date="08022018"] div.film');
	var informarion = Array.prototype.slice.call(informarion_list);

	informarion.forEach(function(item){
		var film_list = item.querySelectorAll('div.info a');
		var film = Array.prototype.slice.call(film_list);
		var time_list = item.querySelectorAll('div.ns p.time');
		var time = Array.prototype.slice.call(time_list);
		
		film.forEach(function(item){
			console.log(' =================================================== ');
			console.log(' -> "'+ item.textContent+'"');

			var url_ = "https://multiplex.ua"+item.href;
			console.log("    link: "+url_);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			needle.get(url_, function(er, d){
			    if (er) throw er;
			    const filmPageBody = new JSDOM(d.body);
			    const filmPage = filmPageBody.window.document;

			    var header_list = filmPage.querySelectorAll('div.column2 h1');
			    var header = Array.prototype.slice.call(header_list);

			    var desc_list = filmPage.querySelectorAll('div.movie_description p');
				var desc = Array.prototype.slice.call(desc_list);

				var trailer_list = filmPage.querySelectorAll('div#desktop_trailer');
				var trailer = Array.prototype.slice.call(trailer_list);

				var cinema_list = filmPage.querySelectorAll('div.all_sessions_area div.cinema p a');
				var cinema = Array.prototype.slice.call(cinema_list);

				console.log('  ');
				header.forEach(function(item){
					console.log(' ==> '+item.textContent);
				});
				desc.forEach(function(item){
					console.log(' ---описание--- ');
					console.log(' '+item.textContent);
					console.log('                  ');
				});
				trailer.forEach(function(item){
					console.log('Ссылка:');
					trailer_link = item.getAttribute('data-moviehref')
					console.log("https://multiplex.ua"+trailer_link);
				});
				cinema.forEach(function(item){
					var theater_name = item.textContent;
					if (theater_name === 'Проспект'){
					}
				});
			});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			time.forEach(function(item){
				var seanceTime = item.textContent;
				if (seanceTime >= '23') {
					console.log(' +  ' + seanceTime);
				} if (seanceTime < '23'){
					console.log('    ' + seanceTime);
				}
			});
		});
	});
	console.log('  ');
	console.log(' Приятного просмотра! ');
	console.log('  ');
	console.log('  ');
});