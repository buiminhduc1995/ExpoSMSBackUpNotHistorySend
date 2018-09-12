import React from 'react';
import Router from './src/Router'
import {createStore} from 'redux';
import {Provider} from 'react-redux';
const defaultState = {
  fullname: '',
  token: '',
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CAP_NHAT_USER':
      return {
        ...state,
        fullname: action.fullname,
        token: action.token,
      };
    default:
      break;
  }
  return state;
}
const store = createStore(reducer);
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router/>
      </Provider>
    );
  }
}
