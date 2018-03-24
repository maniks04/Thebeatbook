import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios'
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import * as reducers from '../reducers/index.js'
import Calendar from './calendar.jsx'
import TextField from 'material-ui/TextField';
import Login from './login.jsx'
import Artist from './artist.jsx'
import Venue from './venue.jsx'


class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {


        return( <div>
                    {!this.props.store.artist && !this.props.store.venue &&
                        <Login history={this.props.history}/>
                    }

                    {this.props.store.artist &&
                       <Artist />
                    }
                    {this.props.store.venue  &&
                        <Venue />
                    }
                </div>)
    }
}


const mapStateToProps = state => (
    { store: state } // eslint-disable-line
  );

  const mapDispatchToProps = dispatch => (
    { actions: bindActionCreators(actions, dispatch) }
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
