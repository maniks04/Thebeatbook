import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import { Carousel } from 'antd';
import * as actions from '../actions/index.js';
import beatbookdisplay from '../../../beatbookmac.png';
import logo from '../../../beatbooklogo.png';


class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  loadLoginPage() {
    this.props.actions.loadLoginPage();
  }


  scrollDown(id) {
    $('html,body').animate({ scrollTop: $(`#${id}`).offset().top }, 'slow');
  }

  render() {
    return (
      <div>
        <div style={styles.logocontainer}>
          <img src={logo} style={styles.logo} alt="" />
          <div style={styles.beatbook}>beatbook</div>
          <div style={styles.test}>
            <div onClick={() => this.loadLoginPage()} style={styles.login}>login/register</div>
            <div style={styles.login}>contact us</div>
          </div>
        </div>
        <div>
          <Carousel autoplay>
            <div><h3><img src={beatbookdisplay} style={styles.image} alt="" /></h3></div>
            <div><h3><img src={beatbookdisplay} style={styles.image} alt="" /></h3></div>
            <div><h3><img src={beatbookdisplay} style={styles.image} alt="" /></h3></div>
            <div><h3><img src={beatbookdisplay} style={styles.image} alt="" /></h3></div>
          </Carousel>
        </div>
        <button onClick={() => this.scrollDown('below')} />
        <div style={styles.below}>
          <div id="below">start</div>
          <div>lower part of page</div>
        </div>


      </div>
    );
  }
}

const mapStateToProps = state => (
  { store: state }
);

const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators(actions, dispatch) }
);

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);


const styles = {
  logo: {
    height: 40,
    width: 40,
    display: 'inline-block',
    filter: 'invert(1)',
  },
  beatbook: {
    fontSize: 40,
    fontFamily: 'system-ui',
    color: 'white',
    display: 'inline-block',
  },

  image: {
    position: 'relative',
    zIndex: 1,
    margin: '0 auto',
    marginTop: '7%',
    height: '75%',
  },
  login: {
    fontSize: 20,
    fontFamily: 'system-ui',
    color: 'white',
    display: 'inline-block',
    paddingRight: 50,
  },
  test: {
    marginTop: '2%',
    display: 'inline-block',
    float: 'right',
  },
  below: {
    position: 'absolute',
    top: '100%',
    width: '100%',
    backgroundColor: 'white',
    overflow: 'scroll',
  },
};
