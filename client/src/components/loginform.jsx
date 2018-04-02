import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox, Modal } from 'antd';
import { withRouter } from 'react-router';
import * as actions from '../actions/index.js';

const FormItem = Form.Item;


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }

  submitLogin(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.actions.submitLogin(values.userName, values.password);
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
      <div>
        <Modal
          visible={this.props.store.registerModalStatus}
          footer={[
            <Button key="venue" onClick={() => this.loadVenueRegisterPage()}>Venue</Button>,
            <Button key="artist" onClick={() => this.loadArtistRegisterPage()}>Artist</Button>,
          ]}
          onCancel={() => this.closeRegisterModal()}
        />
        <Form onSubmit={e => this.submitLogin(e)} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              id="username"
              prefix={<Icon
                type="user"
                style={{ color: 'rgba(0,0,0,.25)' }}
              />}
              placeholder="Username"
            />,
          )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon
                type="lock"
                style={{ color: 'rgba(0,0,0,.25)' }}
              />}
              type="password"
              placeholder="Password"
            />,
          )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>,
          )}
            <a className="login-form-forgot" href="">Forgot password</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
            </Button>
          Or <a onClick={() => this.openRegisterModal()}>register now!</a>
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
