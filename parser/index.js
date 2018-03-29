const needle = require('needle');
const { JSDOM } = require('jsdom');
const URL = 'https://multiplex.ua/cinema/kyiv/prospect';

const getDate = () => {
	const date = new Date();
	const day = date.toLocaleString('en', {day: '2-digit'});
	const month = date.toLocaleString('en', {month: '2-digit'});
	const year = date.toLocaleString('en', {year: 'numeric'});
	return [day, month, year].join('');
}

const getSeance = (film) => {
	const seance_list = film.querySelectorAll('div.ns p.time');
	const seance = Array.prototype.slice.call(seance_list);
	return seance.map(function(item){
		return item.textContent;
	});
};
const getFilm = (film) => {
	const title = film.querySelector('div.info a');
	return {
		title: title.textContent,
		link:"https://multiplex.ua" + title.href,
		time: getSeance(film)
	};
};

const getContent = (information) => {
	return information.map(function(item){
		return getFilm(item);
	});
};

const getFilmData = async () => {	
	const data = await needle('get', URL);
	const mltplxBody = new JSDOM(data.body);
	const mltplx = mltplxBody.window.document;
	const information_list = mltplx.querySelectorAll('.cinema_inside[data-date="' + getDate() + '"] div.film');
	const information = Array.prototype.slice.call(information_list);
	return {
		date: new Date(),
		content: getContent(information)
	};
}

module.exports = getFilmData;

if (!module.parent) {
	getFilmData().then((res)=> {
		console.log('>>>>>>>>>> Parser is runing<<<<<<<<<<');
		console.log('Result: \n', res);
	});
}

