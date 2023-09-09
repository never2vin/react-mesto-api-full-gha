const API_URL = process.env.REACT_APP_API_URL || 'https://api.pr15.nomoredomainsicu.ru';

class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _request(endpoint, method, body) {
    const options = {
      method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    return fetch(`${this._baseUrl}/${endpoint}`, options).then(this._getResponseData)
  }

  _getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  getAllInitialData() {
    return Promise.all([this.getUserInfo(), this.getCards()]);
  }

  getUserInfo() {
    return this._request('users/me', 'GET')
  }

  updateUserInfo({ name, about }) {
    return this._request('users/me', 'PATCH', { name, about })
  }

  updateUserAvatar(link) {
    return this._request('users/me/avatar', 'PATCH', { avatar: link })
  }

  getCards() {
    return this._request('cards', 'GET')
  }

  addCard({ name, link }) {
    return this._request('cards', 'POST', { name, link })
  }

  removeCard(id) {
    return this._request(`cards/${id}`, 'DELETE')
  }

  changeLikeCardStatus(cardId, isLiked) {
    return this._request(`cards/${cardId}/likes`, isLiked ? 'DELETE' : 'PUT')
  }
}

export const api = new Api(API_URL);
