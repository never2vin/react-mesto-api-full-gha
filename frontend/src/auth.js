import baseUrl from './config';

function makeRequest(url, method, body, token) {
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  return fetch(`${baseUrl}${url}`, options).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  });
};

export function register(password, email) {
  return makeRequest('/signup', 'POST', {password, email});
};

export function authorize(password, email) {
  return makeRequest('/signin', 'POST', {password, email});
};

export function checkToken(token) {
  return makeRequest('/users/me', 'GET', null, token);
};
