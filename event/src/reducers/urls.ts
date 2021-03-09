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
    if(action.type === 'initializeState') {
        return {...oldState};
    }
    let newState;
    switch (action.type) {
        case 'ADD_URL':
            return {
                ...state,
                urls: [
                    ...state.urls,
                    action.payload.url
                ]
            }
        case 'REMOVE_URL': {
            newState = {...state, urls: [...state.urls]};
            newState.urls.splice(action.payload.index, 1);
            return newState;
        }
        case 'UPDATE_URL': {
            newState = {...state, urls: [...state.urls]};
            newState.urls.splice(action.payload.index, 1, action.payload.url);
            return newState;
        }
        default:
            break;
    }
    /* if(oldState != state) {
        chrome.storage.local.set({'count':{...state}});
    } */
    return state;
};