import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox, Modal, Col } from 'antd';
import { withRouter } from 'react-router';
import * as actions from '../actions/index.js';

const FormItem = Form.Item;


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }
  submitLogin(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.submitLogin(values.userName, values.password);
      }
    });
  }

  openRegisterModal() {
    this.props.actions.openRegisterModal(); // sets register modal state to true
  }

  closeRegisterModal() {
    this.props.actions.closeRegisterModal(); // sets register modal state to false
  }

  loadArtistRegisterPage() {
    this.closeRegisterModal();
    this.props.history.replace('/artistregister'); // closes modal and loads artist registration form
  }

  loadVenueRegisterPage() {
    this.closeRegisterModal();
    this.props.history.replace('/venueregister'); // closes modal and loads venue registration form
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={styles.container}>
        <Modal
          visible={this.props.store.registerModalStatus}
          footer={[
            <Button key="venue" onClick={() => this.loadVenueRegisterPage()}>Venue</Button>,
            <Button key="artist" onClick={() => this.loadArtistRegisterPage()}>Artist</Button>,
          ]}
          onCancel={() => this.closeRegisterModal()}
        />

        <Form onSubmit={e => this.submitLogin(e)} className="login-form">
          <Col span={24}>
            <FormItem>
              {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                className="logininput"
                id="username"
                prefix={<Icon type="user" style={{ color: 'rgba(255,255,255,1)' }} />}
                placeholder="Username"
                style={styles.input}
              />)}
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem>
              {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                className="logininput"
                prefix={<Icon type="lock" style={{ color: 'rgba(255,255,255,1)' }} />}
                type="password"
                placeholder="Password"
                style={styles.input}
              />)}
            </FormItem>
          </Col>

          <FormItem>
            {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>,
          )}
            <a className="login-form-forgot" href="">Forgot password</a>
            <Button type="primary" htmlType="submit" className="login-form-button" style={styles.button}>
            Log in
            </Button>
            <a onClick={() => this.openRegisterModal()}>register now!</a>
          </FormItem>

        </Form>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));


const styles = {
  container: {
    display: 'inline-block',
  },
  input: {
    height: 50,
  },
  button: {
    height: 50,
    backgroundColor: '#e6005c',
    borderRadius: 25,
    borderColor: 'Transparent',
    fontSize: 17,
  },
};
