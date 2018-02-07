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

    var informarion_list = mltplx.querySelectorAll('.cinema_inside[data-date="07022018"] div.film div.info');
	var informarion = Array.prototype.slice.call(informarion_list);

	informarion.forEach(function(item){
		var film_list = item.querySelectorAll('a');
		var film = Array.prototype.slice.call(film_list);
		var time_list = item.querySelectorAll('div.ns p.time');
		var time = Array.prototype.slice.call(time_list);

		film.forEach(function(item){
			console.log(' =================================================== ');
			console.log(' --> ' + item.textContent);
			time.forEach(function(item){
				console.log('     ' + item.textContent);
			});
		});
	});

	console.log(" Приятного просмотра! ");
});