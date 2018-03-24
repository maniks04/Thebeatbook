import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Input, Table, Divider, Modal } from 'antd';
const Search = Input.Search;
import axios from 'axios';
import calendar from './calendar.jsx';

let bookings = [];

const columns = [{
  title: 'Name',
  key: 'name',
  dataIndex: 'venue_name',
  sorter: true,
  width: '40%',
}, {
  title: 'Capacity',
  key: 'capacity',
  dataIndex: 'capacity',
  sorter: true,
  width: '20%',
}, {
  title: 'Address',
  key: 'address',
  dataIndex: 'venue_address',
}, {
  title: 'Calendar',
  key: 'calendar',
  render: (text, record) => (
    <span>
      <a href="#" onClick={() => {
        viewCalendar(record.venue_id)
      }}>View Venue Calendar</a>
    </span>
  )
}];

const viewCalendar = (id) => {
  axios.get('/venueCalendar', {
    params: {
      venue_id: id
    }
  }).then((res) => {
    bookings = res.data;
    Modal.success({
      title: 'Venue Calendar',
      width: window.innerWidth*.6,
      content: calendar(bookings, false)
    });
  }).catch((err) => {
    console.error('error', err);
  })
};

class SearchVenues extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      venues: [],
      pagination: {},
      loading: false,
      fetched: false
    }
  }

  onSearch(info) {
    axios.get('/venues', {
      params: {
        city: info
      }
    }).then(res => {
      this.setState({
        fetched: true,
        venues: res.data.venues
      })
    }).catch(err => {
      console.error('error', err)
    })
  }

  render() {
    if (this.state.fetched === false) {
      return (
        <Search
        placeholder="Enter A City Here"
        onSearch={value => this.onSearch(value)}
        style={{ width: 300 }}
        enterButton
        />
      );
    } else {
      return (
        <div>
        <Search
        placeholder="Enter A City Here"
        onSearch={value => this.onSearch(value)}
        style={{ width: 300 }}
        enterButton
        />
        <Divider />
        <Table
        columns={columns}
        rowKey={(record) => record.registered}
        onClick={this.viewCalendar}
        dataSource={this.state.venues}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
      </div>
      );
    }
  }
}

const mapStateToProps = state => (
    { store: state } // eslint-disable-line
  );

  const mapDispatchToProps = dispatch => (
    { actions: bindActionCreators(actions, dispatch) }
  );


export default connect(mapStateToProps, mapDispatchToProps)(SearchVenues);
