import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';

global.localStorage = {
  token: 'someToken',
  getItem: function () {
     return 'someToken'
  }
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Root />, div);
});
