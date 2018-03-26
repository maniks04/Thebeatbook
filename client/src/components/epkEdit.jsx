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
    let artist_id = this.props.artistID
    let artist_name = $('.band').val();
    let artist_description = $('.description').val();
    let artist_city = $('.city').val();
    let artist_state = $('.state').val();
    axios.post('/updateEPK', {
      band: artist_name,
      artist_description: artist_description,
      artist_city: artist_city,
      artist_state: artist_state,
      artist_id: artist_id
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
