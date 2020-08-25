import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { postLogin } from '../../api';
import AuthContext from './authContext';
import { LOGIN } from './authReducer';

export default function login() {
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /** update the historic of the router */
  const history = useHistory();
  const location = useLocation();
  /** Define a new previous page for the historic. if the location state is empty, go back to the home page */
  const { from } = location.state || { from: { pathname: '/' } };

  const submit = async (e) => {
    e.preventDefault();

    const request = await postLogin({
      email,
      password,
    });
    const response = await request.json();
    dispatch({ type: LOGIN, payload: response });

    /** Replace the previous page where we come from, not by the login page, but the page before the login page */
    history.replace(from);
  };

  return (
    <section>
      <h1>toto16@gmail.com</h1>
      <form action="POST" onSubmit={submit}>
        <div className="form-group">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit">Log in</button>
        </div>
      </form>
    </section>
  );
}
