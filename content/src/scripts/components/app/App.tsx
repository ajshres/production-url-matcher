import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { parseRoute } from '../../utils/url.utils';
import './app.css';

interface UrlRoute {
  url: string;
  match: "exact" | "base" | "baseWithPath",
  settings: {
      borderColor?: string;
      borderWidth?: string;
      text?: string;
  }
}

class App extends Component<any, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    console.log();
    const url = window.location.href;
    const routeObject = parseRoute(url, this.props.urls);
    const showMarker = !!routeObject;
    if (showMarker) {
      const style: React.CSSProperties = {};
      const settings = routeObject && routeObject.settings;
      if (settings) {
        if (settings.borderColor) {
          style.borderColor = settings.borderColor
        }
        if (settings.borderWidth) {
          style.borderWidth = settings.borderWidth+'px';
        }
      }
      return (
        <div className="production-url-identifier-main" style={style}></div>
      );
    }  else {
      return <></>
    }
  }
}

const stateToProps = (state: any) =>({
  urls: state.urls && state.urls.urls || []
});

export default connect(stateToProps)(App);
