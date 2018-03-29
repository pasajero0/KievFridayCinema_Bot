
const getFilmData = require('../parser');

const _getFilmList = () => {
  const seanses = {};
  return async (id) => {
    if (!seanses[id]) {
      seanses[id] = await getFilmData();
    }
    return seanses[id];
  }
}

module.exports = {
  getFilmList: _getFilmList(),
}
