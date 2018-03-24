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

  onClick() {
    let id = this.props.artistID
    let band = $('.band').val();
    let description = $('.description').val();
    let city = $('.city').val();
    let state = $('.state').val();
    axios.post('/updateEPK', {
      band: band,
      description: description,
      city: city,
      state: state,
      id: id
    }).then(res => {
    }).catch(err => {
      console.error(err)
    })
  }

  render() {
    return (
      <Form className="login-form">
        <FormItem>
            <Input
              className='band'
              placeholder='Band Name?'
            ></Input>
        </FormItem>
        <FormItem>
          <Input
            className='city'
            placeholder='Your City?'
          ></Input>
        </FormItem>
        <FormItem>
          <Input
            className='state'
            placeholder='Your State?'
          ></Input>
        </FormItem>
        <FormItem>
            <TextArea
              className='description'
              placeholder="Please Insert Your Band Bio Here!"
              autosize={{ minRows: 4, maxRows: 12 }}
             />
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => this.onClick()}
            className="login-form-button">
            Save Changes
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
