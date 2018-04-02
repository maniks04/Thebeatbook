import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Icon, Input, Button } from 'antd';
import * as actions from '../actions/index.js';

const FormItem = Form.Item;

class VenueRegisterForm extends React.Component {
  constructor(props) {
    super(props);
  }

  registerVenue(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.registerVenue(
          values.username,
          values.password,
          values.email,
          values.venueName,
          values.address,
          values.city,
          values.state,
          values.capacity);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Form onSubmit={e => this.registerVenue(e)} className="login-form">
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{
                required: true,
                message: 'Please input your username!',
              }],
            })(
              <Input
                id="username"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{
                required: true,
                message: 'Please input your Password!',
              }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('confirmPassword', {
              rules: [{
                required: true,
                message: 'Please confirm your Password!',
              }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Confirm Password"
              />)}
          </FormItem>
          <FormItem>{
            getFieldDecorator('email', {
              rules: [{
                required: true,
                message: 'Please input your Password!',
              }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="email"
                placeholder="Email"
              />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('venueName', {
              rules: [{
                required: true,
                message: 'Please input your Password!',
              }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="venueName"
                placeholder="Venue Name"
              />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('address', {
              rules: [{
                required: true,
                message: 'Please input your Password!',
              }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="address"
                placeholder="Address"
              />)}
          </FormItem>
          <FormItem>{getFieldDecorator('city', {
            rules: [{
              required: true,
              message: 'Please input your Password!',
            }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="city"
              placeholder="City"
            />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('state', {
              rules: [{
                required: true,
                message: 'Please input your Password!',
              }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="state"
                placeholder="State"
              />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('capacity', {
              rules: [{
                required: true,
                message: 'Please input your Password!',
              }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="capacity"
                placeholder="Venue Capacity"
              />)}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">Register
            </Button>
          </FormItem>
        </Form>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VenueRegisterForm));
