import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Home from './components/homepage.jsx';
import ArtistRegister from './components/artistregister.jsx';
import VenueRegister from './components/venueregister.jsx';
import reducer from './reducers/index.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';//eslint-disable-line

const store = createStore(reducer, applyMiddleware(thunk));

const Base = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/artistregister" component={ArtistRegister} />
        <Route exact path="/venueregister" component={VenueRegister} />
        {/* <Route  path="/artist/:username" component={Artist} /> */}
      </Switch>
    </Router>
  </Provider>
);

const render = () => {
  ReactDOM.render(<Base store={store} />, document.getElementById('app'));
};

store.subscribe(render);
render();
