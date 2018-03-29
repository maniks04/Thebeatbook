import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Icon } from 'antd';
import axios from 'axios';
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
    axios.get('/epk', {
      params: {
        artistId: this.state.artistId,
      },
    }).then(({ data }) => {
      if (data.epk.imageUrl !== null) {
        data.epk.imageUrl = Buffer.from(data.epk.imageUrl); /* eslint-disable-line */
      }
      let splitYoutube = data.epk.artist_youtube ? data.epk.artist_youtube.split('/') : '';
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
        artist_spotify: data.epk.artist_spotify,
      });
    }).catch((err) => {
      console.error('error', err); /* eslint-disable-line */
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
          <Col span={3}><img src={this.state.imageUrl} width="100%" /></Col>
          <Col span={20}>
            <h1 size="56">
              {this.state.artist_name} - {this.state.artist_city}, {this.state.artist_state}
            </h1>
          </Col>
        </Row>
        <Row gutter={32}>
          <Col span={3}>
            <h2 style={{ color: 'rgba(0,0,0,.25)' }}><Icon type="facebook" style={{ color: 'rgba(0,0,0,.25)' }} />
              {this.state.artist_facebook}
            </h2>
            <h2 style={{ color: 'rgba(0,0,0,.25)' }}><Icon type="twitter" style={{ color: 'rgba(0,0,0,.25)' }} />
              {this.state.artist_twitter}
            </h2>
            <h2 style={{ color: 'rgba(0,0,0,.25)' }}><Icon type="instagram" style={{ color: 'rgba(0,0,0,.25)' }} />
              {this.state.artist_instagram}
            </h2>
            <h2 style={{ color: 'rgba(0,0,0,.25)' }}><Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
              {this.state.artist_contact}
            </h2>
          </Col>
          <Col span={16}>
            <h1>Similar Bands</h1>
            {this.mapSupport()}
          </Col>
        </Row>
        <Row>
          <Col span={3} />
          <Col span={16}>
            <h1>Band Bio</h1>
            {this.state.artist_description}
          </Col>
        </Row>
        <Row>
          <Col span={3} />
          <Col span={16}>
            <iframe // eslint-disable-line
              width="560"
              height="315"
              src={this.state.artist_youtube}
              frameBorder="0"
              allowFullScreen
            >
            </iframe>
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

export default connect(mapStateToProps, mapDispatchToProps)(EPKView);
