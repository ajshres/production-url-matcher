import * as React from 'react';
import { render } from 'react-dom';

import App from './components/app/App';
import store from './store';
/// <reference path="declaration.d.ts"/>

import {Provider} from 'react-redux';


const anchor = document.createElement('div');
anchor.id = 'rcr-anchor';

document.body.insertBefore(anchor, document.body.childNodes[0]);

render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('rcr-anchor')
);
