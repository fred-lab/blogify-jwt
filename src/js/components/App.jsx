import React, { useContext, useEffect, useState } from 'react';
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
import AuthContext, { AuthProvider } from './auth/authContext';
import { LOGIN } from './auth/authReducer';
import Loader from './shared/Loader';
import { refreshToken } from '../services/auth';

export default function App() {
  useEffect(() => {
    console.log('App is ready');
  }, []);
  return (
    <AuthProvider>
      <Router>
        <nav>
          <Link to="/">DashBoard</Link>
          <Link to="/articles">Articles</Link>
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
    </AuthProvider>
  );
}

function AuthenticateRoute({ children }) {
  const { user, dispatch } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);

  // Get the previous location's information to pass to the "from" inside the Redirect component
  // It will set, in the historic, the previous page to the page before the login page instead of the login page
  // If the user go back to the previous page (and the user is auth), it will render the previous page before the login page and not the login
  const location = useLocation();

  useEffect(() => {
    (async () => {
      const status = await refreshToken();
      console.log('status', status);

      if (status && status.isAuth) {
        dispatch({
          type: LOGIN,
          payload: status,
        });
      }
    })();

    setLoading(false);
  }, []);

  if (isLoading) return <Loader />;

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
