import React, { useContext } from 'react';
import Authcontext from '../auth/authContext';
import { LOGOUT } from '../auth/authReducer';

export default function Articles() {
  const { user, dispatch } = useContext(Authcontext);

  return (
    <div>
      <h1>Articles</h1>
      <p onClick={(e) => dispatch({ type: LOGOUT })}>Logout</p>
    </div>
  );
}
