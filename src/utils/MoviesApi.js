class MoviesApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }


  // Загрузка карточек с сервера beatfilm-movies
  getInitialMovies() {
    return fetch(`${this._baseUrl}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(this._handleResponse)
  }
  
}
const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default moviesApi;
