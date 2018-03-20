import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import {open} from '../actions'
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import VenueRegisterForm from './venueregisterform.jsx'

const logo = 'https://cdn3.iconfinder.com/data/icons/business-vol-2/72/57-512.png'
const VenueRegisterFormContainer = Form.create()(VenueRegisterForm); //component for antd loginform

class VenueRegister extends React.Component {
    constructor(props) {
        super(props)
    }


componentDidMount() {
    console.log('artistregister', this.props.history)
}

registerVenue(username, password, email, venueName, address, city, state, capacity) {
    axios.post('/register/venue', {
        username: username,
        password: password, 
        email: email,
        venueName: venueName, 
        address: address, 
        city: city, 
        state: state,
        capacity: capacity
    }).then(res => {
        console.log(res.data)
    }).catch(err => {
        console.log('error', err)
    })
}


    render() {
        return(
            <div style={styles.registerbox}>
                      <img src={logo} style={styles.logo}></img>
                      <div style={styles.beatbook}>beatbook</div>
                      <div style={styles.divider}></div>
                      <div style={styles.registerform}>
                        <VenueRegisterFormContainer registerVenue={this.registerVenue}/> 
                      </div>
                    </div >
        )
    }
}


const mapStateToProps = state => (
    { store: state } // eslint-disable-line
  );
  
  const mapDispatchToProps = dispatch => (
    { actions: bindActionCreators(actions, dispatch) }
  );

export default connect(mapStateToProps, mapDispatchToProps)(VenueRegister);


const styles = {
    logo: {
        height: 20,
        width: 20,
        display: 'inline-block'

    },
    beatbook: {
        fontSize: 20,
        fontFamily: 'system-ui',
        marginTop: '5%',
        display: 'inline-block'
    },
    loginbutton: {
        textAlign: 'center'
    },
    registerbox: {
        backgroundColor: 'white',
        position: 'absolute',
        borderStyle: 'solid',
        borderWidth: .5,
        borderColor: '#e6e6e6',
        width: window.innerWidth/4,
        height: window.innerHeight*.75,
        left: window.innerWidth*3/8,
        top: window.innerHeight*1/8,
        textAlign: 'center'
    },
    registerform: {
        marginLeft: 50,
        marginRight: 50

    },
    divider: {
        borderStyle: 'solid',
        borderWidth: .5,
        borderColor: '#e6e6e6', 
        marginLeft: 25,
        marginRight: 25,
        marginTop: 50,
        marginBottom: 50
    }
}