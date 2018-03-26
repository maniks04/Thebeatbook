import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import calendar from './calendar.jsx';
import { Modal, Button, Avatar, Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class ArtistEpkEdit extends React.Component {

  constructor(props) {
    super(props)
  }



  componentDidMount() {
  }



    render() {

        return (
          <div>Artist Profile Edit 
            <input></input>
            <input></input>
            <input></input>
            <input></input>
            <input></input>
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


export default connect(mapStateToProps, mapDispatchToProps)(ArtistEpkEdit);