import React, { useContext } from 'react';
import Authcontext from '../auth/authContext';
import { LOGOUT } from '../auth/authReducer';

export default function Dashboard() {
  const { dispatch } = useContext(Authcontext);
  return (
    <section>
      <h1>Welcome to Dashboard</h1>
      <p onClick={(e) => dispatch({ type: LOGOUT })}>Logout</p>
    </section>
  );
}
