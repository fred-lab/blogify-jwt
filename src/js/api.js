import Parameters from './parameters';
import { getAccessToken, setAccessToken } from './services/auth';

const jwtDecode = require('jwt-decode');

export const postRefreshToken = () => {
  return fetch(Parameters.api.refresh_token, {
    method: 'POST',
  });
};

const request = async (method, route, headers = {}, body = undefined) => {
  /** For every request (except for login), try to refresh the access token */
  if (getAccessToken() && route !== Parameters.api.login) {
    const { exp } = jwtDecode(getAccessToken());

    /** Check if the current access token is still valid */
    if (Date.now() <= exp * 1000) {
      const data = await postRefreshToken();
      const response = await data.json();

      setAccessToken(response.access_token);
    } else {
      setAccessToken('');
    }

    /** Trigger a custom event to signal that a new access token has been generated */
    const refreshEvent = new CustomEvent('refresh_token', {
      detail: {
        accessToken: getAccessToken(),
        isAuth: getAccessToken() !== '',
      },
    });

    document.dispatchEvent(refreshEvent);
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
