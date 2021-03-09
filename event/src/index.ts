import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';

import { alias, wrapStore } from 'webext-redux';

const aliases = {
    // this key is the name of the action to proxy, the value is the action
    // creator that gets executed when the proxied action is received in the
    // background
    'production-url-identifier': () => {
        // this call can only be made in the background script
        console.log('called production-url-identifier');
    }
  };
const store = createStore(rootReducer,
    applyMiddleware(
        alias(aliases)
    )
);
wrapStore(store, {
    portName: 'production-url-identifier'
});

console.log("*** CHROME EXTENTION INITIALIZATION IN BACKGROUND ***");

// chrome.storage.local.get(['productionURLs'], function(ob) {
//     console.log("Event::index ==>  Chrome Sync",ob);
//     store.dispatch({    
//         'type':'initializeState',
//         'count':ob.productionURLs || {urls: []}
//     });
// });