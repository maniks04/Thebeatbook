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
import Calendar from '../actions/calendar.js'
import TextField from 'material-ui/TextField';
import Login from './login.jsx'


class Home extends React.Component {
    constructor(props) {
        super(props)
        this.submitLogin = this.submitLogin.bind(this)
    }

    
    componentDidMount() {
        console.log('mounted homepage')
    }


    submitLogin(username, password) {
        axios.post('/login', {
            username: username,
            password: password
        }).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })   
    }

    


    render() {
     
        
        return( <div>
                    <Login history={this.props.history} submitLogin={this.submitLogin}/>  
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
