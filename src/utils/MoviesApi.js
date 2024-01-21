class Api {
  constructor({ url }) {
    this._url = url;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(this._url, {
      method: 'GET'
    })
    .then(res => {
      return this._handleResponse(res);
    })
  }
};

const api = new Api({ url: 'https://api.nomoreparties.co/beatfilm-movies' });

export default api;