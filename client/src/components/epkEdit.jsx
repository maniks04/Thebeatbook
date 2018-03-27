import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import { Form, Icon, Input, Button, Upload } from 'antd'; /* eslint-disable-line */
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

  onClick() {
    const artist_id = this.props.artistID;
    const artist_name = $('.band').val();
    const artist_description = $('.description').val();
    const artist_city = $('.city').val();
    const artist_state = $('.state').val();
    axios.post('/updateEPK', {
      artist_name,
      artist_description,
      artist_city,
      artist_state,
      artist_id,
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
        <FormItem>
          <Input
            className="band"
            placeholder="Band Name?"
          />
        </FormItem>
        <FormItem>
          <Input
            className="city"
            placeholder="Your City?"
          />
        </FormItem>
        <FormItem>
          <Input
            className="state"
            placeholder="Your State?"
          />
        </FormItem>
        <FormItem>
          <TextArea
            className="description"
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
          onChange={this.handleChange}
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
