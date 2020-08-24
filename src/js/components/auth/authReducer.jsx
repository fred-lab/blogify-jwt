import { initialState } from './authContext';

export const LOGIN = 'login';
export const LOGOUT = 'logout';

const login = (state, payload) => {
  if (!payload) return state;

  console.log('User is log successfully');

  return {
    isAuth: payload.isAuth,
    access_token: payload.access_token,
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
