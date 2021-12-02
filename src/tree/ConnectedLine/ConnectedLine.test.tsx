import React from 'react';
import ReactDOM from 'react-dom';
import ConnectedLine from './ConnectedLine';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ConnectedLine />, div);
  ReactDOM.unmountComponentAtNode(div);
});