interface UrlRoute {
    url: string;
    match: "exact" | "base" | "baseWithPath",
    settings: {
        borderColor?: string;
        borderWidth?: string;
        text?: string;
    }
}

interface RouteObject {
    baseUrl: string;
    withPath: string;
    exactUrl: string;
}

export function parseRoute(route: string, urls: Array<UrlRoute>): false | UrlRoute {
    
    const routeObject: RouteObject = getRouteObject(route);

    // for(const [index, url] of urls.entries()) {}
    let flag: false | UrlRoute = false;
    for (const urlObject of urls) {
        if (!flag) {
            flag = evaluateRoute(routeObject, urlObject);
        }
    }
    return flag;
}

function evaluateRoute(routeObject: RouteObject, urlObject: UrlRoute) {
    // currently working only for url base
    const urlRouteObject = getRouteObject(urlObject.url);
    switch(urlObject.match) {
        case 'base':
            return routeObject.baseUrl === urlRouteObject.baseUrl ? urlObject : false;
        case 'baseWithPath':
            return routeObject.withPath === urlRouteObject.withPath? urlObject : false;
        case 'exact':
            return routeObject.exactUrl === urlRouteObject.exactUrl? urlObject : false;
        default:
            return false;
    }
}

function getRouteObject(urlString: string): RouteObject {
    const routeUrl = new URL(urlString);
    // let hash = '';
    // if (routeUrl.hash) {
    //     hash = routeUrl.hash.split('?')[0]
    // }
    const routeUrlWithPathName = decodeURIComponent(routeUrl.host + routeUrl.pathname);
    return {
        baseUrl: decodeURIComponent(routeUrl.host),
        withPath: routeUrlWithPathName,
        exactUrl: urlString
    };
}