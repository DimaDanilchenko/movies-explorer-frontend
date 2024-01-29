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
  // Сохранение фильма
  saveMovie(movieData) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(movieData)
    })
      .then(this._handleResponse)
  }
  deleteSavedMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(res => {
        return this._checkStatus(res);
      })
  }

  // Загрузка информации о пользователе с сервера
  getUserProfile(jwt) {
    return fetch(`${this._baseUrl}/profile`, {
      method: 'GET',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${jwt}`
      }
    })
      .then(this._handleResponse)
  }

  getSavedMovies(jwt) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${jwt}`
      },
      credentials: 'include'
    })
      .then(this._handleResponse)
  }

  // Редактирование профиля
  updateUser(name, email) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        name,
        email
      }),
    })
      .then(this._handleResponse)
  }

  //Добавление фильма
  addNewCard(movie, token) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        ...this._headers,
        "content-type": "application/json",
        'Authorization': `Bearer ${token}`
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
    })
      .then(this._handleResponse)
  }


}

const mainApi = new MainApi({
  baseUrl: 'http://localhost:3000',
  //baseUrl: 'https://api.dima-dan.nomoredomainsmonster.ru',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default mainApi;