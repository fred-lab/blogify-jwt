import React from 'react';
import ReactDOM from 'react-dom';

import '../scss/main.scss';

import App from './components/App';
import { AuthProvider } from './components/auth/authContext';

// eslint-disable-next-line no-console
console.log('init !!');

function Main() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

/** App */
ReactDOM.render(<Main />, document.getElementById('app'));
