import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';

import { alias, wrapStore } from 'webext-redux';

const aliases = {
    // this key is the name of the action to proxy, the value is the action
    // creator that gets executed when the proxied action is received in the
    // background
    'production-url-identifier': () => {
        // this call can only be made in the background script
        console.log('************************************************************');
        console.log('************** PRODUCTION URL IDENTIFIER *******************');
        console.log('************************************************************');
        console.log('********************* INITIALIZING... **********************');
        console.log('************************************************************');
    }
  };
// Creating store to connect background task with popup and content
const store = createStore(rootReducer,
    applyMiddleware(
        alias(aliases)
    )
);
wrapStore(store, {
    portName: 'production-url-identifier' // unique port-name to identify messaging channel
});

console.log("*** CHROME EXTENTION INITIALIZATION IN BACKGROUND ***");

chrome.storage.local.get(['productionURLs'], function(ob) {
    console.log("Event::index ==>  Chrome Sync",ob);
    store.dispatch({    
        'type':'initializeState',
        'payload':ob.productionURLs || {urls: []}
    });
});