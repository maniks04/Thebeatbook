import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { Input, Table, Divider, Modal } from 'antd';
import * as actions from '../actions/index.js';
import calendar from './calendar.jsx';

const { Search } = Input;

class SearchVenues extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saveToStore: this.props.actions.addBooking.bind(this),
      venues: [],
      pagination: {},
      loading: false,
      fetched: false,
      venueBookings: [],
      columns: [{
        title: 'Name',
        key: 'name',
        dataIndex: 'venue_name',
        sorter: (a, b) => (a.venue_name.toUpperCase() > b.venue_name.toUpperCase() ? -1 : 1),
        width: '35%',
      }, {
        title: 'Capacity',
        key: 'capacity',
        dataIndex: 'capacity',
        sorter: (a, b) => a.capacity - b.capacity,
        width: '15%',
      }, {
        title: 'Address',
        key: 'address',
        dataIndex: 'venue_address',
        width: '30%',
      }, {
        title: 'Calendar',
        key: 'calendar',
        render: (text, record) => (
          <span>
            <a
              href="#"
              onClick={() => {
                this.viewCalendar(record.venue_id, record.venue_name);
              }}
            >
            View Venue Calendar
            </a>
          </span>
        ),
      }],
    };
  }

  onSearch(info) {
    axios.get('/venues', {
      params: {
        city: info,
      },
    }).then((res) => {
      this.setState({
        fetched: true,
        venues: res.data.venues,
      });
    }).catch((err) => {
      console.error('error', err);
    });
  }

  viewCalendar(id, venueName) {
    const { artistId } = this.props.store;
    axios.get('/venueCalendar', {
      params: {
        venue_id: id,
      },
    }).then((res) => {
      this.setState({
        venueBookings: res.data.filter(booking => booking.denied === 0),
      });
      Modal.info({
        title: 'Venue Calendar',
        content: calendar(this.state.venueBookings, true, artistId, id, this.state.saveToStore, venueName),
        width: 800,
        okText: 'Close',
        maskClosable: true,
      });
    }).catch((err) => {
      console.error('error', err);
    });
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
    }
    return (
      <div>
        <Search
          placeholder="Enter A City Here"
          onSearch={value => this.onSearch(value)}
          style={{ width: 300 }}
          enterButton
        />
        <Divider />
        {/* xx Venues found for [city] */}
        <Table
          columns={this.state.columns}
          rowKey={record => record.venue_id}
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

const mapStateToProps = state => (
    { store: state } // eslint-disable-line
);

const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators(actions, dispatch) }
);


export default connect(mapStateToProps, mapDispatchToProps)(SearchVenues);
