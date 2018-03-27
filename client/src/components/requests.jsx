import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tabs, List } from 'antd';
import axios from 'axios';
import * as actions from '../actions/index.js';

const moment = require('moment');

const { TabPane } = Tabs;
//* ******************************************DO NOT LINT, WORK IN PROGRESS*******************

class Requests extends React.Component {
  constructor(props) {
    super(props);
    const { bookings } = this.props.store;
    this.state = {
      pending: bookings.filter(booking => booking.confirmed === 0),
      confirmed: bookings.filter(booking => booking.confirmed === 1),
      // loadingMore: false,
      // showLoadingMore: true,
    };
  }

  onSeeEventClick(item) {
    console.log(item);
  }

  onSeeVenueDetailsClick(item) {
  }


  // ADD ABILITY TO UNCONFIRM EVENT
  onConfirmClick(item) {
    console.log(item);
    axios.patch('/booking', item)
      .then((res) => {
        const updatedBookings = res.data.bookings;
        this.props.actions.setBookings(updatedBookings);
        this.setState({
          pending: updatedBookings.filter(booking => booking.confirmed === 0),
          confirmed: updatedBookings.filter(booking => booking.confirmed === 1),
        });
      }).catch(err => console.log(err));
  }

  onEpkClick(item) {
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
              renderItem={(item) => {
                let name;
                const time = item.start_time || '';
                if (isArtist === true) {
                  name = item.venue_name;
                } else {
                  name = item.artist_name;
                }
                return (
                  <List.Item actions={[<a onClick={() => this.onSeeEventClick(item)} >See Event Details</a>]}>
                    <List.Item.Meta
                      title={<a href="https://ant.design">{name}</a>}
                      description={item.booking_description}
                    />
                    <div>Gig on: {moment(time.slice(0, 10)).format('MMM Do YY')}</div>
                  </List.Item>
                  );
              }}
            />
          </TabPane>
          <TabPane tab="Pending" key="2">
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              dataSource={pending}
              renderItem={(item) => {
                let name;
                const time = item.start_time || '';
                const subtab = [];
                if (isArtist === true) {
                  name = item.venue_name;
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
                    <div>Trying to gig: {moment(time.slice(0, 10)).format('MMM Do YY')}</div>
                  </List.Item>
                );
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
