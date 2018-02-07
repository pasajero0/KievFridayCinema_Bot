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
		console.log(time);

		film.forEach(function(item){
			console.log(' ===================================== ');
			console.log(' -> "'+ item.textContent+'"');

			var url_ = "https://multiplex.ua"+item.href;
			console.log("    link: "+url_);

			time.forEach(function(item){
				var seanceTime = item.textContent;
				var seanceTimeSplit = seanceTime.split(':')[0];
				if (seanceTimeSplit === '23' || seanceTimeSplit === '00') {
					console.log(' +  ' + seanceTime);
				}else{
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