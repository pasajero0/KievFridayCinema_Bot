const needle = require('needle');
const { JSDOM } = require('jsdom');
const moment = require('moment');
const URL = 'https://multiplex.ua/cinema/kyiv/prospect';

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

const getFilmData = async (date) => {	
	const data = await needle('get', URL);
	const mltplxBody = new JSDOM(data.body);
	const mltplx = mltplxBody.window.document;
	const information_list = mltplx.querySelectorAll('.cinema_inside[data-date="' + date.format('DDMMYYYY') + '"] div.film');
	const information = Array.prototype.slice.call(information_list);
	return {
		date: new Date(),
		content: getContent(information)
	};
}

module.exports = getFilmData;
