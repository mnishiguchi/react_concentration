// Load styles using style-loader.
require('./scss/main.scss');

// Load React.
import React    from 'react';
import ReactDOM from 'react-dom';

// Load App.
import App      from './App';

// Load data.
import data     from './data.js';
// import iconData from './iconData.js';

// Bootstrap the app.
ReactDOM.render(<App data={data} />, document.getElementById('app'));
