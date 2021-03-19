const initialData: UrlReducer = {urls: []};

interface UrlRoute {
    url: string;
    match: "exact" | "base" | "baseWithPath",
    settings: {
        borderColor?: string;
        borderWidth?: string;
        text?: string;
    }
  }

interface UrlReducer {
    urls: UrlRoute[]
}
export default (oldState: UrlReducer, action: any) => {
    const state: UrlReducer = oldState || initialData;
    console.log('action type', action.type);
    if(action.type === 'initializeState') {
        console.log("Initialized...");
        return {...oldState, ...action.payload};
    }
    let newState = state;
    switch (action.type) {
        case 'ADD_URL':
            newState = {
                ...state,
                urls: [
                    ...state.urls,
                    action.payload.url
                ]
            }
            break;
        case 'REMOVE_URL': {
            newState = {...state, urls: [...state.urls]};
            newState.urls.splice(action.payload.index, 1);
            break;
        }
        case 'UPDATE_URL': {
            newState = {...state, urls: [...state.urls]};
            newState.urls.splice(action.payload.index, 1, action.payload.url);
            break;
        }
        default:
            break;
    }
    if(oldState != newState && action.type.indexOf("@@redux") === -1) {
        console.log("save state", {...newState});
        chrome.storage.local.set({'productionURLs':{...newState}});
    }
    return {...newState};
};