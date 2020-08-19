import React from 'react';
import ReactDOM from 'react-dom';

import '../scss/main.scss';

import Welcome from './components/Welcome';

// eslint-disable-next-line no-console
console.log('init !!');

/** App */
ReactDOM.render(<Welcome />, document.getElementById('app'));
