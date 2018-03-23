import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Row, Col } from 'antd';
import axios from 'axios';



class EPKView extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    	artistId: this.props.artist,
    	artistName: null,
    	artistDescription: null,
    	//other EPK pieces
    }
  }

  componentDidMount() {
  	console.log('this is the artistID in the EPK', this.state.artistId);
  	//fetchEpk
  	 axios.get('/epk', {
      params: {
        artistId: this.state.artistId
      }
    }).then(res => {
        console.log('EPK data', res.data)
        this.setState({
        	artistName: res.data.epk.artist_name
        })
    }).catch(err => {
      console.log('error', err)
    })
  }


  onSearch(info) {

  }



  render() {
  	return(
	  <div>
	    <Row>
	      <Col span={12}>{this.state.artistName}</Col>
	      <Col span={12}>col-12</Col>
	    </Row>
	    <Row>
	      <Col span={8}>col-8</Col>
	      <Col span={8}>col-8</Col>
	      <Col span={8}>col-8</Col>
	    </Row>
	    <Row>
	      <Col span={6}>col-6</Col>
	      <Col span={6}>col-6</Col>
	      <Col span={6}>col-6</Col>
	      <Col span={6}>col-6</Col>
	    </Row>
	  </div>
    ); 
  }
}

const mapStateToProps = state => (
    { store: state } // eslint-disable-line
  );

  const mapDispatchToProps = dispatch => (
    { actions: bindActionCreators(actions, dispatch) }
  );


export default connect(mapStateToProps, mapDispatchToProps)(EPKView);



