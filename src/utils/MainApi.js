class MainApi {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  getToken(jwt) {
    this._headers.authorization = `Bearer ${jwt}`;
  }
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  _request(url, options) {
    return fetch(url, options).then(this._handleResponse)
  }

  // Загрузка информации о пользователе с сервера
  getUserProfile(token) {
    return fetch(`${this._baseUrl}/user/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`
      }
    })
      .then(this._handleResponse)
  }

  editUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email
      })
    }).then(this._handleResponse)
  }

  // Загрузка сохраненных фильмов с сервера
  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
    })
      .then(this._handleResponse)
  }

  //Добавление фильма
  createMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co/${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN
      })
    }).then(this._handleResponse)
  }

  // Удаление фильма
  deleteMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    }).then(this._handleResponse)
  }
}

const mainApi = new MainApi({
  //baseUrl: 'http://localhost:3000',
  baseUrl: 'https://api.dima.movies.nomoredomainswork.ru',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default mainApi;