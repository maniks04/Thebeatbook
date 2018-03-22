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

class ArtistEpkEdit extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI8q3t3Oa-Hi2DAdu8729f4RkWQ6rACYRAozbJjG7WUTKZDgaDtQ"
  }
  }



  componentDidMount() {
    console.log('mounted ArtistProfileEdit')
  
  }

  image() {
    console.log($('.image').val())
    this.setState({image: $('.image').val()})
}

    render() {

        return (
          <div>Artist Profile Edit 
            <input></input>
            <input></input>
            <input></input>
            <input></input>
            <input></input>
            <input className="image" placeholder="image"></input>
            <button onClick={() => this.image()}></button>
            <img src={this.state.image} />
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