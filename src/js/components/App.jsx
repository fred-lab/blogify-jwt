import React, { useContext } from 'react';
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

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <nav>
          <Link to="/">DashBoard</Link>
          <Link to="/articles">Articles</Link>
        </nav>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <AuthenticateRoute exact path="/">
            <Dashboard />
          </AuthenticateRoute>
          <AuthenticateRoute path="/articles">
            <Articles />
          </AuthenticateRoute>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

function AuthenticateRoute({ children }) {
  const { user } = useContext(AuthContext);
  // Get the previous location's information to pass to the "from" inside the Redirect component
  // It will set, in the historic, the previous page to the page before the login page instead of the login page
  // If the user go back to the previous page (and the user is auth), it will render the previous page before the login page and not the login
  const location = useLocation();

  if (user.isAuth) {
    return <Route>{children}</Route>;
  }
  return (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: location },
      }}
    />
  );
}
