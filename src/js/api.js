import Parameters from './parameters';
import { getAccessToken, setAccessToken } from './services/auth';
const jwtDecode = require('jwt-decode');

export const postRefreshToken = () => {
  return fetch(Parameters.api.refresh_token, {
    method: 'POST',
  });
};

const request = async (method, route, headers = {}, body = undefined) => {
  if (getAccessToken() && route !== Parameters.api.login) {
    const { exp } = jwtDecode(getAccessToken());

    if (Date.now() <= exp * 1000) {
      const data = await postRefreshToken();
      const response = await data.json();

      console.log('r ', response);

      setAccessToken(response.access_token);
    } else {
      setAccessToken('');
    }
  }

  return fetch(route, {
    method,
    headers: getAccessToken()
      ? {
          Credentials: 'include',
          Authorization: `Bearer ${getAccessToken()}`,
          ...headers,
        }
      : {
          Credentials: 'include',
          ...headers,
        },
    body,
  });
};

const get = (route, headers = {}) => {
  return request('GET', route, headers);
};

const post = (route, body = null, headers = {}) => {
  return request('POST', route, headers, body);
};

const postJson = (route, body = null, headers = {}) => {
  return post(route, JSON.stringify(body), {
    ...headers,
    'Content-type': 'application/json; charset=UTF-8',
  });
};

export const postLogin = (body) => {
  return postJson(Parameters.api.login, body);
};

export const getUser = (id) => {
  return get(`/api/user/${id}`);
};
