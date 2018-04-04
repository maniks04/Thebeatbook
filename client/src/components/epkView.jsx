import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Icon } from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router';
import * as actions from '../actions/index.js';


class EPKView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistId: this.props.artist,
      imageUrl: '',
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
      if (data.epk.imageUrl !== null) {
        data.epk.imageUrl = Buffer.from(data.epk.imageUrl); /* eslint-disable-line */
      }
      let splitYoutube = data.epk.artist_youtube ? data.epk.artist_youtube.split('/') : '';
      const sliceSpot = data.epk.artist_spotify ? data.epk.artist_spotify.slice(32) : '';
      splitYoutube = `https://www.youtube.com/embed/${splitYoutube[splitYoutube.length - 1]}`;
      this.setState({
        artist_name: data.epk.artist_name,
        artist_description: data.epk.artist_description,
        artist_city: data.epk.artist_city,
        artist_state: data.epk.artist_state,
        artist_twitter: data.epk.artist_twitter,
        artist_facebook: data.epk.artist_facebook,
        artist_instagram: data.epk.artist_instagram,
        artist_support: data.epk.artist_support,
        artist_contact: data.epk.artist_contact,
        imageUrl: data.epk.imageUrl,
        artist_youtube: splitYoutube,
        artist_spotify: sliceSpot,
        artist_contactEmail: data.epk.artist_contactEmail,
      });
    }).catch((err) => {
      console.error('error', err); /* eslint-disable-line */
    });
  }

  getArtistByName() {
    console.log('match', this.props);
    axios.get('/artist/epk', {
      params: {
        username: this.props.match.params.username,
      },
    }).then(({ data }) => {
      if (data.epk.imageUrl !== null) {
        data.epk.imageUrl = Buffer.from(data.epk.imageUrl); /* eslint-disable-line */
      }
      let splitYoutube = data.epk.artist_youtube ? data.epk.artist_youtube.split('/') : '';
      const sliceSpot = data.epk.artist_spotify ? data.epk.artist_spotify.slice(32) : '';
      splitYoutube = `https://www.youtube.com/embed/${splitYoutube[splitYoutube.length - 1]}`;
      this.setState({
        artist_name: data.epk.artist_name,
        artist_description: data.epk.artist_description,
        artist_city: data.epk.artist_city,
        artist_state: data.epk.artist_state,
        artist_twitter: data.epk.artist_twitter,
        artist_facebook: data.epk.artist_facebook,
        artist_instagram: data.epk.artist_instagram,
        artist_support: data.epk.artist_support,
        artist_contact: data.epk.artist_contact,
        imageUrl: data.epk.imageUrl,
        artist_youtube: splitYoutube,
        artist_spotify: sliceSpot,
      });
    }).catch((err) => {
      console.log(err);
    });
  }


  mapSupport() {
    const splitSupport = this.state.artist_support ? this.state.artist_support.split('||') : [];
    if (splitSupport.length) {
      return splitSupport.map((support, i) => {// eslint-disable-line
        return (
          <h2 key={i}>{/* eslint-disable-line */}
            <Icon type='right' style={{ color: 'rgba(0,0,0,.25)' }} /> {support}{/* eslint-disable-line */}
          </h2>
        );
      });
    } else { // eslint-disable-line
      return (
        <p />
      );
    }
  }

  render() {
    return (
      <div>
        <Row align="bottom" type="flex" gutter={32}>
          <Col span={5}><img src={this.state.imageUrl} width="100%" /></Col>
          <Col span={16}>
            <h1 size="56">
              {this.state.artist_name} - {this.state.artist_city}, {this.state.artist_state}
            </h1>
          </Col>
        </Row>
        <Row gutter={32}>
          <Col span={5}>
            <h2 style={{ color: 'rgba(0,0,0,.25)' }}><Icon type="facebook" style={{ color: 'rgba(0,0,0,.25)' }} />
              {this.state.artist_facebook}
            </h2>
            <h2 style={{ color: 'rgba(0,0,0,.25)' }}><Icon type="twitter" style={{ color: 'rgba(0,0,0,.25)' }} />
              {this.state.artist_twitter}
            </h2>
            <h2 style={{ color: 'rgba(0,0,0,.25)' }}><Icon type="instagram" style={{ color: 'rgba(0,0,0,.25)' }} />
              {this.state.artist_instagram}
            </h2>
          </Col>
          <Col span={16}>
            <h1>Similar Bands</h1>
            {this.mapSupport()}
          </Col>
        </Row>
        <Row gutter={32}>
          <Col span={5} />
          <Col span={16}>
            <h1>Band Bio</h1>
            {this.state.artist_description}
          </Col>
        </Row>
        <br />
        <Row gutter={32}>
          <Col span={5} />
          <Col span={16}>
            <iframe
              title="youtube"
              width="100%"
              height="315"
              src={this.state.artist_youtube}
              frameBorder="0"
              allowFullScreen
            />
            <br />
            <iframe
              title="spotify"
              src={`https://open.spotify.com/embed?uri=spotify:artist:${this.state.artist_spotify}`}
              width="100%"
              height="380"
              frameBorder="0"
              allowTransparency="true"
            />
          </Col>
        </Row>
        <Row gutter={32}>
          <Col span={5} />
          <Col span={16}>
            <h1>Contact </h1>
            Email: {this.state.artist_contactEmail} <br />
            Number: {this.state.artist_contact}
          </Col>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EPKView));
