
const getFilmData = require('../parser');

const _getFilmList = () => {
  const seanses = {};
  return async (id) => {
    if (!seanses[id]) {
      seanses[id] = await getFilmData(id);
    }
    return seanses[id];
  }
}

const timeFilter = (val) => {
  return val.time.filter( (value) => {
    const hour = value.split(':', 1 );
    return hour == '23' || hour == '00';
    }); 
};
const afterEleven = (seances) => {
  return seances.map( (val) => {
    const data = timeFilter(val);
    if (data.length != 0) {
      return {
        'title': val.title,
        'link': val.link,
        'time': data
      };
    };
  }).filter((val) => val);
};

module.exports = {
  getFilmList: _getFilmList(),
  afterEleven,
}