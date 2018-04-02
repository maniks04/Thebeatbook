import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import * as actions from '../actions/index.js';

class VenueDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios.get('/venueDetails', {
      params: {
        venue_id: this.props.venueId,
      },
    }).then(({ data }) => {
      console.log(data);
      this.setState({
        capacity: data.capacity,
        venue_stage: data.venue_stage,
        venue_address: data.venue_address,
        venue_city: data.venue_city,
        venue_description: data.venue_description,
        venue_name: data.venue_name,
        venue_state: data.venue_state,
        venue_website: data.venue_website,
      });
    }).catch((err) => {
        console.error(err); /* eslint-disable-line */
    });
  }

  render() {
    return (
      <div>
        <div>Venue Name:  {this.state.venue_name}</div>
        <div>Venue Location: {this.state.venue_address} - {this.state.venue_city}, {this.state.venue_state} </div>
        <div>Venue Capacity: {this.state.capacity}</div>
        <div>Venue Description: {this.state.venue_description} </div>
        <div> Venue Stage Info: {this.state.venue_stage} </div>
        <div> Venue Website: {this.state.venue_website} </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
    { store: state } // eslint-disable-line
);

const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators(actions, dispatch) } /* eslint-disable-line */
);

export default connect(mapStateToProps, mapDispatchToProps)(VenueDetailView);
