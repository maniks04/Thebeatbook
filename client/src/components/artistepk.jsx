import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import RaisedButton from 'material-ui/RaisedButton';
import calendar from './calendar.jsx'
import TextField from 'material-ui/TextField';
import { Modal, Button, Avatar, Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class ArtistEpk extends React.Component {

  constructor(props) {
    super(props)
  }



  componentDidMount() {
    //console.log('mounted ArtistProfile')
    //console.log(this.props.store)
  }



    render() {
        //the artist himself clicks to see his profile, it runs the function to 
        //set all epk values based on his username
        //this page displays the current epk values
        //if a venue clicks on an artist, it will set epkstates to 
        //that artist and load that artist's epk values
        //based on their username
        return (
          <div>
          {this.props.store.epkName}
          <br/>
          {this.props.store.epkDescription}
          <br/>
          {this.props.store.epkCity}
          <br/>
          {this.props.store.epkState}
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
