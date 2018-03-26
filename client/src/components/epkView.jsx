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
    	artist_name: null,
    	artist_description: null,
      artist_city: null,
      artist_state: null
    	//other EPK pieces
    }
  }

  componentDidMount() {
  	 axios.get('/epk', {
      params: {
        artistId: this.state.artistId
      }
    }).then(res => {
        this.setState({
        	artist_name: res.data.epk.artist_name,
          artist_description: res.data.epk.artist_description,
          artist_city: res.data.epk.artist_city,
          artist_state: res.data.epk.artist_state
        })
    }).catch(err => {
      console.error('error', err)
    })
  }

  onSearch(info) {

  }

  render() {
  	return(
	  <div>
	    <Row>
	      <Col span={12}>{this.state.artist_name}</Col>
	      <Col span={12}>{this.state.artist_description}</Col>
	    </Row>
	    <Row>
	      <Col span={8}>{this.state.artist_city}</Col>
	      <Col span={8}>{this.state.artist_state}</Col>
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
