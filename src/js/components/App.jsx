import React, { useContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useLocation,
} from 'react-router-dom';
import Login from './auth/Login';
import Dashboard from './newsroom/Dashboard';
import Articles from './newsroom/Articles';
import AuthContext from './auth/authContext';
import { REFRESH } from './auth/authReducer';

export default function App() {
  const { user, dispatch } = useContext(AuthContext);

  /**
   * When the "refresh_token" event is emit, update the Auth context with the new Access Token
   * @param {CustomEvent} e
   */
  const onRefreshToken = (e) => {
    dispatch({ type: REFRESH, payload: e.detail });
  };

  useEffect(() => {
    document.addEventListener('refresh_token', onRefreshToken);
  }, []);

  return (
    <Router>
      <nav>
        <Link to="/">DashBoard</Link>
        <Link to="/articles">Articles</Link>
        <p>{user.access_token}</p>
      </nav>
      <Switch>
        <AuthenticateRoute exact path="/">
          <Dashboard />
        </AuthenticateRoute>
        <AuthenticateRoute path="/articles">
          <Articles />
        </AuthenticateRoute>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

function AuthenticateRoute({ children }) {
  const { user } = useContext(AuthContext);

  // Get the previous location's information to pass to the "from" inside the Redirect component
  // It will set, in the historic, the previous page to the page before the login page instead of the login page
  // If the user go back to the previous page (and the user is auth), it will render the previous page before the login page and not the login
  const location = useLocation();

  if (user.isAuth) return <Route>{children}</Route>;

  return (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: location },
      }}
    />
  );
}
