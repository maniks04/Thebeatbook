import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import {open} from '../actions'
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

class NormalLoginForm extends React.Component {
  constructor (props) {
    super(props);
  }

  handleSubmit (e) {
    e.preventDefault();
  }

  componentDidMount() {

  }
  

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Save Changes
          </Button>
        </FormItem>
        <FormItem>
          {getFieldDecorator('artistName', {
            rules: [{ required: true, message: 'Please input your band name!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="BAND NAME" />
          )}
        </FormItem>




        <FormItem>
          {getFieldDecorator('artistBio', {
            rules: [{ required: false}],
          })(
            <TextArea placeholder="Please Insert Your Band Bio Here!" autosize={{ minRows: 2, maxRows: 6 }} />
          )}
        </FormItem>
        <FormItem>
           {//getFieldDecorator('remember', {
          //   valuePropName: 'checked',
          //   initialValue: true,
          // })(
          //   <Checkbox>Remember me</Checkbox>
          // )}
          // <a className="login-form-forgot" href="">Forgot password</a>
          
          // Or <a href="">register now!</a>
        }
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;