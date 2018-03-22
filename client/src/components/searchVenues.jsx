import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Input } from 'antd';
const Search = Input.Search;
import axios from 'axios';

class SearchVenues extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      venues: []
    }
  }

  componentDidMount() {
    console.log('logging the store!:::', this.props.store.bookings);
    //cities
  }


  onSearch(info) {
    axios.get('/venues', {
      params: {
        city: info
      }
    }).then(res => {
      console.log(res.data)
      this.setState({
        venues: res.data
      })
    }).catch(err => {
      console.log('error', err)
    })
  }



  render() {
    return (
      <Search
      placeholder="Enter A City Here"
      onSearch={value => this.onSearch(value)}
      style={{ width: 300 }}
      enterButton
      />
    )
  }
}

const mapStateToProps = state => (
    { store: state } // eslint-disable-line
  );

  const mapDispatchToProps = dispatch => (
    { actions: bindActionCreators(actions, dispatch) }
  );


export default connect(mapStateToProps, mapDispatchToProps)(SearchVenues);
