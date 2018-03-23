import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Input, Table } from 'antd';
const Search = Input.Search;
import axios from 'axios';


const columns = [{
  title: 'Name',
  dataIndex: 'venue_name',
  sorter: true,
  width: '40%',
}, {
  title: 'Capacity',
  dataIndex: 'capacity',
  sorter: true,
  width: '20%',
}, {
  title: 'Address',
  dataIndex: 'venue_address',
}];

class SearchVenues extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      venues: [/*{venue_id: 2, user_id: 3, venue_name: "Empire Control Room", venue_description: null, capacity: 800, venue_address: "700 Red River Dr."}*/],
      pagination: {},
      loading: false,
      fetched: false
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
        fetched: true,
        venues: res.data.venues
      })
    }).catch(err => {
      console.log('error', err)
    })
  }

  handleTableChange (pagination, filters, sorter) {
    // const pager = { ...this.state.pagination };
    // pager.current = pagination.current;
    // this.setState({
    //   pagination: pager,
    // });
    // this.fetch({
    //   results: pagination.pageSize,
    //   page: pagination.current,
    //   sortField: sorter.field,
    //   sortOrder: sorter.order,
    //   ...filters,
    // });
  }
  fetch (params = {}) {
    // console.log('params:', params);
    // this.setState({ loading: true });
    // axios({
    //   url: '/venues',
    //   method: 'get',
    //   data: {
    //     results: 10,
    //     ...params,
    //   },

    // }).then((data) => {
    //   const pagination = { ...this.state.pagination };
    //   // Read total count from server
    //   // pagination.total = data.totalCount;
    //   pagination.total = 200;
    //   this.setState({
    //     loading: false,
    //     venues: data.results,
    //     pagination,
    //   });
    // });
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
        <Table 
        columns={columns}
        rowKey={(record) => record.registered}
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
