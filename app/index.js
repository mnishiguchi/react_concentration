// Load styles using style-loader.
require('./main.css');

// Load React.
import React    from 'react';
import ReactDOM from 'react-dom';

// Load App.
import App      from './App';

// Bootstrap the app.
ReactDOM.render(<App />, document.getElementById('app'));
