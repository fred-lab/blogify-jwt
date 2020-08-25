import { postRefreshToken } from '../api';
const jwtDecode = require('jwt-decode');

let accessToken = '';

export const getAccessToken = () => accessToken;

export const setAccessToken = (token) => {
  accessToken = token;

  return accessToken;
};

export const refreshToken = async () => {
  if (accessToken) {
    const { exp } = jwtDecode(accessToken);

    if (Date.now() >= exp * 1000) return false;
  }

  const response = await postRefreshToken();

  return response.json();
};
