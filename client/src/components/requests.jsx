import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tabs, List, Modal, Popconfirm, message } from 'antd';
import axios from 'axios';
import * as actions from '../actions/index.js'; // eslint-disable-line
import EPKView from './epkView.jsx'; // eslint-disable-line
import VenueDetailView from './venueDetailView.jsx';

const moment = require('moment');

const { TabPane } = Tabs;
class Requests extends React.Component {
  constructor(props) {
    super(props);
    const { bookings } = this.props.store;
    this.state = {
      pending: bookings.filter(booking => booking.confirmed === 0 && booking.denied === 0),
      confirmed: bookings.filter(booking => booking.confirmed === 1 && booking.denied === 0),
      denied: bookings.filter(booking => booking.denied === 1),
      visible: false,
      booking_description: null, // eslint-disable-line
      booking_title: null,
      start_time: null,
      end_time: null,
      epkVisible: false,
      venueDetailVisible: false,
    };
  }

  onSeeEventClick(item) {
    this.setState({
      visible: true,
      booking_description: item.booking_description, // eslint-disable-line
      booking_title: item.booking_title,
      start_time: item.start_time,
      end_time: item.end_time,
    });
  }

  onConfirmClick(item) {
    axios.patch('/confirm', item)
      .then((res) => {
        const updatedBookings = res.data.bookings;
        this.props.actions.setBookings(updatedBookings);
        this.setState({
          pending: updatedBookings.filter(booking => booking.confirmed === 0 && booking.denied === 0),
          confirmed: updatedBookings.filter(booking => booking.confirmed === 1 && booking.denied === 0),
          denied: updatedBookings.filter(booking => booking.denied === 1),
        });
        message.sucess('This request has been confirmed! We have notified the Artist.');
      }).catch(err => console.error(err));
  }

  onSeeVenueDetailsClick() {
    this.setState({ venueDetailVisible: true });
  }

  onEpkClick() {
    this.setState({
      epkVisible: true,
    });
  }

  onDenyClick(item) {
    axios.patch('/deny', item)
      .then((res) => {
        const updatedBookings = res.data.bookings;
        this.props.actions.setBookings(updatedBookings);
        this.setState({
          pending: updatedBookings.filter(booking => booking.confirmed === 0 && booking.denied === 0),
          confirmed: updatedBookings.filter(booking => booking.confirmed === 1 && booking.denied === 0),
          denied: updatedBookings.filter(booking => booking.denied === 1),
        });
        message.error('This request has been denied. We have notified the Artist.');
      }).catch(err => console.error(err));
  }


  render() {
    const { confirmed, pending, denied } = this.state;
    const isArtist = this.props.store.artist;

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
                    <Modal
                      visible={this.state.visible}
                      maskClosable={true} // eslint-disable-line
                      onOk={() => this.setState({ visible: false })}
                      onCancel={() => this.setState({ visible: false })}
                      cancelText="Edit event"
                      title={this.state.booking_title}
                    >
                      <em>{name}</em>
                      <div>Playing {`${moment(this.state.start_time).format('MMMM Do YYYY')} `}
                           from {`${moment(this.state.start_time).format('h:mm a')} `}
                           til {` ${moment(this.state.end_time).format('h:mm a')}`}
                      </div>
                    </Modal>
                    <div>Gig on: {moment(time.slice(0, 10)).format('MMM Do')}</div>
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
                  subtab.push(
                    <a onClick={() => this.onSeeVenueDetailsClick(item)}>
                      See Venue Details
                      <Modal
                        visible={this.state.venueDetailVisible}
                        onOk={() => this.setState({ venueDetailVisible: false })}
                        cancelText="Cancel"
                        onCancel={() => this.setState({ venueDetailVisible: false })}
                        title="Venue Details"
                      >
                        <div>
                          <VenueDetailView venueId={item.venue_id} />
                        </div>
                      </Modal>
                    </a>);
                } else {
                  name = item.artist_name;
                  subtab.push(
                    <Popconfirm
                      title="Are you sure you want to confirm this show?"
                      onConfirm={() => this.onConfirmClick(item)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <a href="#" >Confirm Event</a>
                    </Popconfirm>,
                    <a onClick={() => this.onSeeEventClick(item)}> View Details</a>,
                    <a onClick={() => this.onEpkClick(item)}>See EPK</a>,
                    <Popconfirm
                      title="Are you sure you want to deny this request?"
                      onConfirm={() => this.onDenyClick(item)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <a href="#" >Deny</a>
                    </Popconfirm>);
                }
                return (
                  <List.Item actions={subtab}>
                    <List.Item.Meta
                      title={<a href="https://ant.design">{name}</a>}
                      description={item.booking_description}
                    />
                    <Modal
                      visible={this.state.epkVisible}
                      maskClosable={true} // eslint-disable-line
                      onOk={() => this.setState({ epkVisible: false })}
                      onCancel={() => this.setState({ epkVisible: false })}
                      width="70%"
                    >
                      <EPKView artist={item.artist_id} />
                    </Modal>
                    <Modal
                      visible={this.state.visible}
                      maskClosable={true} // eslint-disable-line
                      onOk={() => this.setState({ visible: false })}
                      title={this.state.booking_title}
                    >
                      <em>{name}</em>
                      <div>Requesting to play {`${moment(this.state.start_time).format('MMMM Do YYYY')} `}
                           from {`${moment(this.state.start_time).format('h:mm a')} `}
                           til {` ${moment(this.state.end_time).format('h:mm a')}`}
                      </div>
                    </Modal>
                    <div>Trying to gig: {moment(time.slice(0, 10)).format('MMM Do')}</div>
                  </List.Item>
                );
              }}
            />
          </TabPane>
          <TabPane tab="Denied" key="3">
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              dataSource={denied}
              renderItem={(item) => {
                let name;
                const time = item.start_time || '';
                const subtab = [];
                if (isArtist === true) {
                  name = item.venue_name;
                } else {
                  name = item.artist_name;
                  subtab.push(
                    <Popconfirm
                      title="Are you sure you want to Restore this request(it will move to Pending)?"
                      onConfirm={() => this.onRestoreClick(item)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <a href="#" >Restore Request</a>
                    </Popconfirm>,
                    <a onClick={() => this.onSeeEventClick(item)}> View Details</a>,
                    <a onClick={() => this.onEpkClick(item)}>See EPK</a>);
                }
                return (
                  <List.Item actions={subtab}>
                    <List.Item.Meta
                      title={<em>{name}</em>}
                      description={<em>{item.booking_description}</em>}
                    />
                    <Modal
                      visible={this.state.epkVisible}
                      maskClosable={true} // eslint-disable-line
                      onOk={() => this.setState({ epkVisible: false })}
                      onCancel={() => this.setState({ epkVisible: false })}
                      title={name}
                      width="70%"
                    >
                      <EPKView artist={item.artist_id} />
                    </Modal>
                    <Modal
                      visible={this.state.visible}
                      maskClosable={true} // eslint-disable-line
                      onOk={() => this.setState({ visible: false })}
                      onCancel={() => this.setState({ visible: false })}
                      title={this.state.booking_title}
                    >
                      <em>{name}</em>
                      <div>
                        <em>Initial request sent for {`${moment(this.state.start_time).format('MMMM Do YYYY')} `}
                           from {`${moment(this.state.start_time).format('h:mm a')} `}
                           til {` ${moment(this.state.end_time).format('h:mm a')}`}
                        </em>
                      </div>
                    </Modal>
                    <div><em>Attempted to gig: {moment(time.slice(0, 10)).format('MMM Do')}</em></div>
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
