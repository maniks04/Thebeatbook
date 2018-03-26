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
import { Carousel } from 'antd';


const logo = 'https://cdn3.iconfinder.com/data/icons/business-vol-2/72/57-512.png'
const mac = 'https://www.souldigital.com.au/themes/soul/images/projectpage/imac-frame.png'
class LandingPage extends React.Component {
  constructor(props) {
      super(props)
  }


  render() {
    return(
      <div>
          <div style={styles.logocontainer}>
        <img src={logo} style={styles.logo}></img>
        <div style={styles.beatbook}>beatbook</div>
        <div style={styles.test}>
        <div style={styles.login}>login/register</div>
        <div style={styles.login}>contact us</div>
        </div>
        </div>
        <div>
        <Carousel autoplay>
          <div><h3><img src={mac} style={styles.image}></img></h3></div>
          <div><h3><img src={mac} style={styles.image}></img></h3></div>
          <div><h3><img src={mac} style={styles.image}></img></h3></div>
          <div><h3><img src={mac} style={styles.image}></img></h3></div>
        </Carousel>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => (
  { store: state }
);

const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators(actions, dispatch) }
);

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);


const styles = {
    logo: {
        height: 40,
        width: 40,
        display: 'inline-block',
        filter: 'invert(1)'
    },
    logocontainer: {
        marginLeft: '2%',
        marginTop: '2%',
    },
    beatbook: {
        fontSize: 40,
        fontFamily: 'system-ui',
        color: 'white',
        display: 'inline-block'
    },

    image: {
        margin: '0 auto',
        marginTop: '7%',
        height: '75%'
    },
    login: {
        fontSize: 15,
        fontFamily: 'system-ui',
        color: 'white',
        display: 'inline-block'
    },
    test: {
        //marginLeft: '2%',
        marginTop: '2%',
        display: 'inline-block',
        float: 'right'
    }
    
}