import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'antd';
import axios from 'axios';
import * as actions from '../actions/index.js';

class EPKView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistId: this.props.artist,
    };
  }

  componentDidMount() {
    axios.get('/epk', {
      params: {
        artistId: this.state.artistId,
      },
    }).then(({ data }) => {
      this.setState({
        artist_name: data.epk.artist_name,
        artist_description: data.epk.artist_description,
        artist_city: data.epk.artist_city,
        artist_state: data.epk.artist_state,
        artist_twitter: data.epk.artist_twitter,
        artist_facebook: data.epk.artist_facebook,
        artist_instagram: data.epk.artist_instagram,
        artist_support: data.epk.artist_support,
      });
    }).catch((err) => {
      console.error('error', err); /* eslint-disable-line */
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={12}>{this.state.artist_name}</Col>
          <Col span={12}>{this.state.artist_description}</Col>
        </Row>
        <Row>
          <Col span={8}>{this.state.artist_city}</Col>
          <Col span={8}>{this.state.artist_state}</Col>
          <Col span={8}><img src={this.state.imageUrl} /></Col>
        </Row>
        <Row>
          <Col span={8}>{this.state.artist_twitter}</Col>
          <Col span={8}>{this.state.artist_facebook}</Col>
          <Col span={8}>{this.state.artist_instagram}</Col>
          <Col span={8}>{this.state.artist_support}</Col>
        </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(EPKView);
