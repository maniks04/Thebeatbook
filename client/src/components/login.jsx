import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form } from 'antd';
import * as actions from '../actions/index.js';
import LoginForm from './loginform.jsx';
import logo from '../../../beatbooklogo.png';

const LoginFormContainer = Form.create()(LoginForm); // component for antd loginform

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.loginbox}>
        <img src={logo} style={styles.logo} alt="" />
        <div style={styles.beatbook}>beatbook</div>
        <div style={styles.divider} />
        <div style={styles.loginform}>
          <LoginFormContainer />
        </div>
        <div className="fb-login-button" data-size="medium" data-auto-logout-link="true">facebook login</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = {
  logo: {
    height: 20,
    width: 20,
    display: 'inline-block',

  },
  beatbook: {
    fontSize: 20,
    fontFamily: 'system-ui',
    marginTop: '5%',
    display: 'inline-block',
  },
  loginbutton: {
    textAlign: 'center',
  },
  loginbox: {
    backgroundColor: 'white',
    position: 'absolute',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: '#e6e6e6',
    width: '25%',
    height: '75%',
    left: '37.5%',
    top: '12.5%',
    textAlign: 'center',
    overflow: 'auto',
  },
  loginform: {
    marginLeft: 50,
    marginRight: 50,

  },
  divider: {
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: '#e6e6e6',
    marginLeft: 25,
    marginRight: 25,
    marginTop: 50,
    marginBottom: 50,
  },
};

