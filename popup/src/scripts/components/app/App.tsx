import React, {Component} from 'react';
import { connect } from 'react-redux';
import { CirclePicker, ColorResult } from 'react-color';
import store from '../../store';

interface IState {
  value: string;
  match: "exact" | "base" | "baseWithPath" | string;
  borderColor: string;
  borderWidth: string;
  text: string;
  error: boolean;
}

interface UrlRoute {
  url: string;
  match: "exact" | "base" | "baseWithPath",
  settings: {
    borderColor?: string;
    borderWidth?: string;
    text?: string;
  }
}

class App extends Component<any, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      value: '',
      match: 'base',
      borderColor: '',
      borderWidth: '',
      text: '',
      error: false
    };
  }

  addUrl = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = (this.state.value || '').trim();
    // tslint:disable-next-line:max-line-length
    const urlValidatorRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
    if (!url) {
      return;
    } else if (!urlValidatorRegex.test(url)) {
      this.setState({
        error: true
      })
      return;
    }
    this.setState({
      error: false
    })
    // @Todo: validate url
    store.dispatch({
      type: 'ADD_URL',
      payload: {
        url: {
          url,
          match: this.state.match,
          settings: {
            borderColor: this.state.borderColor,
            borderWidth: this.state.borderWidth,
          }
        },
      }
    });

    this.setState({
      value: '',
      match: 'base',
      borderColor: '',
      borderWidth: '',
      text: '',
      error: false
    })
  }

  onUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: event.target.value
    })
  }

  onBorderColorChange = (color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      borderColor: color.hex
    })
  }

  onBorderWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      borderWidth: event.target.value
    })
  }
  selectMatchType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      match: event.target.value
    })
  }

  removeUrl = (index: number) => {
    store.dispatch({
      type: 'REMOVE_URL',
      payload: {
        index
      }
    });
  }
  render() {
    return (
      <div className="container">
        <div className="url-list-container">
          <h3>Url List</h3>
            {(this.props.urls || []).map((urlObject: UrlRoute, index: number) => (
              <div className="url-box-row">
                <div className="url-title">{urlObject.url}</div>
                <div className="url-action"><button onClick={()=>this.removeUrl(index)}>Remove</button></div>
              </div>
            ))}
        </div>
        <div className="url-add-button">
          <form onSubmit={this.addUrl}>
            <div className="form-group">
              <label>Url:</label>
              <input type="text" value={this.state.value} onChange={this.onUrlChange}/>
              <div className="error">{this.state.error? "Url is not valid": ""}</div>
            </div>
            <div className="form-group">
              <label>Match Type:</label>
              <select onChange={this.selectMatchType} value={this.state.match}>
                <option value="base">Match Base Url</option>
                <option value="exact">Match Exact Url</option>
                <option value="baseWithPath">Match Path Url</option>
              </select>
            </div>
            <div className="form-group">
              <label>Border Color:</label>
              <div style={{display: "inline-flex", width: 250}}>
                <CirclePicker width="22" onChange={this.onBorderColorChange} color={this.state.borderColor} />
              </div>
            </div>
            <div className="form-group">
              <label>Border width</label>
              <input type="number" onChange={this.onBorderWidthChange} value={this.state.borderWidth} />&nbsp;<b>px</b>
            </div>
            <button type="submit">Add URL</button>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => ({
    urls: state.urls && state.urls.urls ||[]
})
export default connect(mapStateToProps)(App);
// export default App;
