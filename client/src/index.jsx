import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Home from './components/homepage.jsx'
import Artist from './components/artist.jsx'
import Venue from './components/venue.jsx'
import ArtistRegister from './components/artistregister.jsx'
import VenueRegister from './components/venueregister.jsx'
import reducer from './reducers/index.js';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import $ from 'jquery'
// import AnyComponent from './components/filename.jsx'

let store = createStore(reducer)
//let store = createStore(reducer, applyMiddleware(thunk));

const Base = ({ store }) => (
  <Provider store={store}>
      <Router>
      <MuiThemeProvider theme={getMuiTheme(lightBaseTheme)}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/artist" component={Artist} />
          <Route exact path="/venue" component={Venue} />
          <Route exact path="/artistregister" component={ArtistRegister} />
          <Route exact path="/venueregister" component={VenueRegister} />
        </Switch>
        </MuiThemeProvider>
      </Router>
  </Provider>
);


function render() {
ReactDOM.render(<Base store={store} />, document.getElementById('app'));
}

store.subscribe(render);
render()