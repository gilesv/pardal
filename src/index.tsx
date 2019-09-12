import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './components/Dashboard';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import store from "./redux/store";
import appVersion from './appVersion';

// Styles
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import "./styles/root.scss";
import "./fonts/FiraCodeRegular.woff2";

const version = "0.0.2";

ReactDOM.render(
  <Provider store={store}>
    <Dashboard appVersion={appVersion} />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
