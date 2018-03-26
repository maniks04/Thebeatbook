import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import calendar from './calendar.jsx';
import { Modal, Tabs, List, Button, Layout, Menu, Breadcrumb, Icon, Spin } from 'antd';
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const moment = require('moment');

class Requests extends React.Component {

  constructor(props) {
    super(props)
    let bookings = this.props.store.bookings;
    this.state = {
      pending: bookings.filter((booking)=> booking.confirmed === 0),
      confirmed: bookings.filter((booking)=> booking.confirmed === 1),
      loadingMore: false,
      showLoadingMore: true,
    }
  }

  componentDidMount() {
  }

  onSeeEventClick(item) {
    console.log(item)
  }

  onSeeVenueDetailsClick (item) {
    console.log(item)
  }


//ADD ABILITY TO UNCOFIRM EVENT
  onConfirmClick(item) {
    console.log(item)
    axios.patch('/booking', item)
      .then(res => {

      }).catch(err => console.log(err))
  }

  onEpkClick(item) {
    console.log(item)
  }


  onSelect(info) {
  }

  callback(key) {
  }


  render() {
  	const { confirmed, pending } = this.state;
    const isArtist = this.props.store.artist;
  	// const loadMore = showLoadingMore ? (
   //  <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
   //    {loadingMore && <Spin />}
   //    {!loadingMore && <Button onClick={}>loading more</Button>}
   //  </div>
  // ) : null;
      return (
        <div>
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="Confirmed" key="1">
              <List
      	        className="demo-loadmore-list"
      	        itemLayout="horizontal"
      	        dataSource={confirmed}
      	        renderItem={item => {
                  let name;
                  let time = item.start_time || '';
                  if (isArtist === true) {
                    name = item.venue_name;
                  } else {
                    name = item.artist_name;
                  }
                  return (
        	          <List.Item actions={[<a>See Event Details</a>]}>
        	            <List.Item.Meta
        	              title={<a href="https://ant.design">{name}</a>}
        	              description={item.booking_description}
        	            />
                      <div>Gig on: {moment(time.slice(0, 10)).format("MMM Do YY")}</div>
        	          </List.Item>
                  )
              }}
              />
            </TabPane>
            <TabPane tab="Pending" key="2">
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={pending}
                renderItem={item => {
                  let name;
                  let time = item.start_time || '';
                  let subtab = [];
                  if (isArtist === true) {
                    name = item.venue_name;
                    /*this goes in venue side*/
                    subtab.push(<a onClick={() => this.onSeeVenueDetailsClick(item)}>See Venue Details</a>);
                  } else {
                    name = item.artist_name;
                    subtab.push(<a onClick={() => this.onConfirmClick(item)}>Confirm Event</a>, <a>See EPK</a>);
                  }
                  return (
                    <List.Item actions={subtab}>
                      <List.Item.Meta
                        title={<a href="https://ant.design">{name}</a>}
                        description={item.booking_description}
                      />
                      <div>Trying to gig: {moment(time.slice(0, 10)).format("MMM Do YY")}</div>
                    </List.Item>
                  )
                }}
              />
            </TabPane>
          </Tabs>
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


export default connect(mapStateToProps, mapDispatchToProps)(Requests);
