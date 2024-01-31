class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }


  // Загрузка карточек с сервера
  getInitialMovies() {
    return fetch(`${this._baseUrl}`, {
      method: "GET",
    })
      .then(this._handleResponse)
  }
  
}
const moviesApi = new MoviesApi({
  //baseUrl: 'http://localhost:3000',
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default moviesApi;
