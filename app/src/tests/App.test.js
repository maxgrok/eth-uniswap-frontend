import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

//describe (each feature supposedly built)
//(1) Lists users and eth balance on one row
//(2) Lists transactions of the user 
//(3) Uses infinite scroll and cursor-based pagination
//(4) Transfer Eth button and form exists, stores the balances in cache, adds tx to appropriate users, pops up modal confirmation
//(5) 