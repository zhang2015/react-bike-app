import React from 'react';
import ReactDOM from 'react-dom';
// import Route from './router'
import './index.css';
import * as serviceWorker from './serviceWorker';
import { routes } from './router';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
// const render = Component => {

ReactDOM.render(
  // <React.StrictMode>
  //   <Component />
  // </React.StrictMode>,
  (<BrowserRouter>
    {renderRoutes(routes)}
  </BrowserRouter>),
  document.getElementById('root')
);
// }
// render(Route)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
