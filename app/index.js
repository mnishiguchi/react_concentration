// Load styles using style-loader.
require('./scss/main.scss');

// Load React.
import React    from 'react';
import ReactDOM from 'react-dom';

// Load App.
import App from './App';

// Load font-awesome idcon names.
import data from './faNames.js';

// Bootstrap the app.
ReactDOM.render(<App data={data} />, document.getElementById('app'));
