import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import { Form, Icon, Input, Button, Upload, message } from 'antd'; /* eslint-disable-line */
const FormItem = Form.Item;
const { TextArea } = Input;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    axios.get('/epk', {
      params: {
        artistId: this.props.artistID,
      },
    }).then((res) => {
      this.setState({
        artist_name: res.data.epk.artist_name,
        artist_description: res.data.epk.artist_description,
        artist_city: res.data.epk.artist_city,
        artist_state: res.data.epk.artist_state,
      });
    }).catch((err) => {
      console.error('error', err); /* eslint-disable-line */
    });
  }

  onClick() {
    const artist_id = this.props.artistID;
    let artist_name = $('.band').val();
    let artist_description = $('.description').val();
    let artist_city = $('.city').val();
    let artist_state = $('.state').val();
    let { imageUrl } = this.state;

    if (artist_name === '') {
      artist_name = this.state.artist_name; /* eslint-disable-line */
    }
    if (artist_description === '') {
      artist_description = this.state.artist_description; /* eslint-disable-line */
    }
    if (artist_city === '') {
      artist_city = this.state.artist_city; /* eslint-disable-line */
    }
    if (artist_state === '') {
      artist_state = this.state.artist_state; /* eslint-disable-line */
    }
    axios.post('/updateEPK', {
      artist_name,
      artist_description,
      artist_city,
      artist_state,
      artist_id,
      imageUrl,
    }).then(() => {
    }).catch((err) => {
      console.error(err) /* eslint-disable-line */
    });
  }

  handleChange(info) {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      console.log('info done: ', info);
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const { imageUrl } = this.state;

    return (
      <Form className="login-form">
        <FormItem> Bane Name?
          <Input
            className="band"
            placeholder={this.state.artist_name}
          />
        </FormItem>
        <FormItem> Your City?
          <Input
            className="city"
            placeholder={this.state.artist_city}
          />
        </FormItem>
        <FormItem> Your State
          <Input
            className="state"
            placeholder={this.state.artist_state}
          />
        </FormItem>
        <FormItem> Band Bio
          <TextArea
            className="description"
            placeholder={this.state.artist_description}
            autosize={{ minRows: 4, maxRows: 12 }}
          />
        </FormItem>
        <div> Change Image of your band.</div>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="http://localhost:3000/epkImgUpload"
          onChange={val => this.handleChange(val)}
        >
          {imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
        </Upload>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => this.onClick()}
            className="login-form-button"
          >
            Save Changes
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const EPKEdit = Form.create()(NormalLoginForm);

export default EPKEdit;
