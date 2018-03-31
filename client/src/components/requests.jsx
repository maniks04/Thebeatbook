import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tabs, List, Modal } from 'antd';
import axios from 'axios';
import * as actions from '../actions/index.js'; // eslint-disable-line
import EPKView from './epkView.jsx'; // eslint-disable-line
import VenueDetailView from './venueDetailView.jsx';

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
      visible: false,
      booking_description: null,
      booking_title: null,
      start_time: null,
      end_time: null,
      epkVisible: false,
      venueDetailVisible: false,
      // loadingMore: false,
      // showLoadingMore: true,
    };
  }

  onSeeEventClick(item) {
    console.log(item);
    this.setState({
      visible: true,
      booking_description: item.booking_description,
      booking_title: item.booking_title,
      start_time: item.start_time,
      end_time: item.end_time
    });
  }

  onSeeVenueDetailsClick(item) {
  }

  onConfirmClick(item) {
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

  onSeeVenueDetailsClick() {
    this.setState({ venueDetailVisible: true });
  }

  onEpkClick() {
    this.setState({
      epkVisible: true,
    });
  }

  render() {
    const { confirmed, pending } = this.state;
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
                let time = item.start_time || '';
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
                      cancelText={'Edit event'}
                      title={this.state.booking_title}
                    >
                      <em>{item.artist_name}</em>
                      <div>Playing {moment(this.state.start_time).format('MMMM Do YYYY')+' '}
                           from {moment(this.state.start_time).format('h:mm')+' '}
                           til {' ' + moment(this.state.end_time).format('h:mm')}
                      </div>
                    </Modal>
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
                  subtab.push(
                    <a onClick={() => this.onSeeVenueDetailsClick(item)}>
                      See Venue Details
                      <Modal
                        visible={this.state.venueDetailVisible}
                        onOk={() => this.setState({ venueDetailVisible: false })}
                        cancelText="Cancel"
                        onCancel={() => this.setState({ venueDetailVisible: false })}
                        title={item.booking_title}
                      >
                        <em>{item.artist_name}</em>
                        <div>
                          <VenueDetailView venueId={item.venue_id} />
                        </div>
                      </Modal>
                    </a>);
                } else {
                  name = item.artist_name;
                  subtab.push(
                    <a onClick={() => this.onConfirmClick(item)}>Confirm Event</a>,
                    <a onClick={() => this.onSeeEventClick(item)}> View Details</a>,
                    <a onClick={() => this.onEpkClick(item)}>See EPK</a>);
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
                      cancelText="Cancel"
                      onCancel={() => this.setState({ epkVisible: false })}
                      title={item.artist_name}
                    >
                      <EPKView artist={item.artist_id} />
                    </Modal>
                    <Modal
                      visible={this.state.visible}
                      maskClosable={true} // eslint-disable-line
                      onOk={() => this.setState({ visible: false })}
                      cancelText="Cancel"
                      onCancel={() => this.setState({ visible: false })}
                      title={item.booking_title}
                    >
                      <em>{item.artist_name}</em>
                      <div>Playing {`${moment(item.start_time).format('MMMM Do YYYY')} `}
                           from {`${moment(item.start_time).format('h:mm')} `}
                           til {`${moment(item.end_time).format('h:mm')}`}
                      </div>
                    </Modal>
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
