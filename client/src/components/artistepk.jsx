import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios'
import RaisedButton from 'material-ui/RaisedButton';
import calendar from './calendar.jsx'
import TextField from 'material-ui/TextField';
import { Modal, Button, Avatar, Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class ArtistEpk extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      epk: []
    }
  }


  
  componentDidMount() {
    this.props.store.username ? 
    this.getArtistEpk(this.props.store.username) :    //gets the epk info of the logged in user
    this.getArtistEpk(this.props.store.chosenArtist)  //gets epk info of a user that the venue is searching for
  }

  getArtistEpk(username) {
    axios.get('/artist/epk', {
      params: {
        username: username
      }
    })
    .then(res => {
      this.setState({epk: res.data[0]})
    }).catch(err => {
      console.log(err)
    })
  }



    render() {
        return (
          <div>
          {this.state.epk.artist_name}
          <br/>
          {this.state.epk.artist_description}
          <br/>
          {this.state.epk.artist_city}
          <br/>
          {this.state.epk.artist_state}
          <br/>
          </div>
          
        )
    }
}

const mapStateToProps = state => (
    { store: state } // eslint-disable-line
  );

  const mapDispatchToProps = dispatch => (
    { actions: bindActionCreators(actions, dispatch) }
  );


export default connect(mapStateToProps, mapDispatchToProps)(ArtistEpk);
