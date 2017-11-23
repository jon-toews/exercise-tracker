import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthExample from './AuthExample';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
