import { setAccessToken } from '../../services/auth';

export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const initialState = {
  isAuth: false,
  access_token: '',
  role: '',
  id: '',
  firstname: '',
  lastname: '',
  email: '',
};

const login = (state, payload) => {
  if (!payload) return state;

  setAccessToken(payload.access_token);

  return {
    isAuth: payload.isAuth,
    access_token: payload.access_token,
    id: payload.id,
    role: payload.role,
    firstname: payload.firstname,
    lastname: payload.lastname,
    email: payload.email,
  };
};

export default function AuthReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      return login(state, payload);
    case LOGOUT:
      return initialState;
    default:
      throw new Error(`Action type : ${type} is not defined`);
  }
}
