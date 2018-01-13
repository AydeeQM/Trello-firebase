import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
import { Provider } from "redux-zero/react";
import store from "./store";

const Index = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(<Index />, document.getElementById('main_container'));
registerServiceWorker();





















/* import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Signup from './Signup';
import Boards from './Boards';
import TrelloApp from './Detailsboard';
import App from './App';
import { Provider } from 'redux-zero/react'
import store from './store';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter, Switch, Route } from 'react-router-dom'


const Index = () => (
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/signin" component={App} />
                <Route path="/signup" component={Signup} />
                <Route path="/boards" component={Boards} />
                <Route path="/details" component={TrelloApp} />
            </Switch>
        </HashRouter>
    </Provider>
)

ReactDOM.render(<Index />, document.getElementById('main_container'));
registerServiceWorker();
 */