import React, { useContext } from 'react';
import Authcontext from '../auth/authContext';
import { LOGOUT, REFRESH } from '../auth/authReducer';
import { getUser } from '../../api';

export default function Articles() {
  const { user, dispatch } = useContext(Authcontext);
  // console.log('user', user.entries());

  return (
    <div>
      <h1>Articles</h1>
      <p
        onClick={async (e) => {
          try {
            const request = await getUser(user.id);
            const response = await request.json();
          } catch (error) {
            console.log('front ', error);
          }
        }}
      >
        Get user info
      </p>
      <ul>
        {Object.entries(user).map(([key, value]) => (
          <li key={key}>{`${key} :  ${value}`}</li>
        ))}
      </ul>
      <p onClick={(e) => dispatch({ type: LOGOUT })}>Logout</p>
      <div
        onClick={(e) =>
          dispatch({
            type: REFRESH,
            payload: { isAuth: true, accessToken: 'toto' },
          })
        }
      >
        Refresh
      </div>
    </div>
  );
}
