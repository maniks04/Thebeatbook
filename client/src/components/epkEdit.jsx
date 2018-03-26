import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import {open} from '../actions'
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import { Form, Icon, Input, Button, Upload } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class NormalLoginForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  handleChange(info) {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }

  onClick() {
    let artist_id = this.props.artistID
    let artist_name = $('.band').val();
    let artist_description = $('.description').val();
    let artist_city = $('.city').val();
    let artist_state = $('.state').val();
    axios.post('/updateEPK', {
      artist_name: artist_name,
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
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;

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
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="//jsonplaceholder.typicode.com/posts/"
          beforeUpload={beforeUpload}
          onChange={this.handleChange} >
          {imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
        </Upload>
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

const EPKEdit = Form.create()(NormalLoginForm);

export default EPKEdit;
