// Load styles using style-loader.
require('./scss/main.scss');

// Load React.
import React    from 'react';
import ReactDOM from 'react-dom';

// Load App.
import App from './App';

// Load font-awesome idcon names.
import faNames from './faNames.js';

// TODO: Maybe doing this inside App component would be better.

let data = faNames.slice( 0, 8 );
let clone = data.slice( 0 );
data = data.concat( clone );
data = shuffle( data );

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;
}

// Bootstrap the app.
ReactDOM.render(<App data={data} />, document.getElementById('app'));
