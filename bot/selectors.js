
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

module.exports = {
  getFilmList: _getFilmList(),
}
