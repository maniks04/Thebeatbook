import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd' /* eslint-disable-line */;
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import * as actions from '../actions/index.js';

const FormItem = Form.Item;

class ArtistRegisterForm extends React.Component {
  registerArtist(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.registerArtist(values.username, values.password, values.email, values.city, values.state);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>

        <Form onSubmit={e => this.registerArtist(e)} className="login-form">
          <FormItem >
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(<Input
              id="username"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(<Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />,
        )} {/*eslint-disable-line*/}
          </FormItem>
          <FormItem>
            {getFieldDecorator('confirmPassword', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(<Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Confirm Password"
          />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(<Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="email"
            placeholder="Email"
          />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('city', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(<Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="city"
            placeholder="City"
          />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('state', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(<Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="state"
            placeholder="State"
          />)}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Register
            </Button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArtistRegisterForm));
