import Parameters from './parameters';
export default {
  get(route, headers = {}) {
    return fetch(route, {
      method: 'GET',
      headers,
    });
  },
  post(route, body, headers = {}) {
    return fetch(route, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
  },
  login(body, headers = {}) {
    return this.post(Parameters.api.login, body, {
      ...headers,
      'Content-type': 'application/json; charset=UTF-8',
    });
  },
};
