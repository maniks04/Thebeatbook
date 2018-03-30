import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'antd';
import axios from 'axios';
import * as actions from '../actions/index.js';
import {withRouter} from 'react-router';

class EPKView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistId: this.props.artist,
      imageUrl: null,
    };
  }

  componentDidMount() {
    return this.props.artist ?
      this.getArtistById() :
      this.getArtistByName();
  }

  getArtistById() {
    axios.get('/epk', {
      params: {
        artistId: this.state.artistId,
      },
    }).then(({ data }) => {
      console.log(data);
      this.setState({
        artist_name: data.epk.artist_name,
        artist_description: data.epk.artist_description,
        artist_city: data.epk.artist_city,
        artist_state: data.epk.artist_state,
        artist_twitter: data.epk.artist_twitter,
        artist_facebook: data.epk.artist_facebook,
        artist_instagram: data.epk.artist_instagram,
        artist_support: data.epk.artist_support,
        //imageUrl: Buffer.from(data.epk.imageUrl),
      });
    }).catch((err) => {
      console.error('error', err); /* eslint-disable-line */
    });
  }

  getArtistByName() {
    console.log('match', this.props)
    axios.get('/artist/epk', {
      params: {
        username: this.props.match.params.username,
      },
    }).then(({ data }) => {
      console.log(data)
      this.setState({
        artist_name: data.epk.artist_name,
        artist_description: data.epk.artist_description,
        artist_city: data.epk.artist_city,
        artist_state: data.epk.artist_state,
        artist_twitter: data.epk.artist_twitter,
        artist_facebook: data.epk.artist_facebook,
        artist_instagram: data.epk.artist_instagram,
        artist_support: data.epk.artist_support,
        //imageUrl: Buffer.from(data.epk.imageUrl),
      });
    }).catch((err) => {
      console.log(err);
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
        {/* <Row>
          <iframe
            title="spotify"
            src="https://open.spotify.com/embed?uri=spotify:artist:0OiYrpibZx4wUXrcjY8Kbb"
            width="300"
            height="380"
            frameBorder="0"
            allowTransparency="true"
            allow="encrypted-media"
          />
        </Row> */}
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
