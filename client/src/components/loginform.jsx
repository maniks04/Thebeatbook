import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Modal } from 'antd';
const FormItem = Form.Item;
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
     
    }

  submitLogin (e)   {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //console.log('Received values of form: ', values);
        this.props.actions.submitLogin(values.userName, values.password)
      }
    });
  }

  openRegisterModal() {
    this.props.actions.openRegisterModal()  //sets register modal state to true
  }

 closeRegisterModal() {
     this.props.actions.closeRegisterModal() //sets register modal state to false
 }

 loadArtistRegisterPage() {
   this.closeRegisterModal()
   this.props.history.replace('/artistregister') //closes modal and loads artist registration form
 }

 loadVenueRegisterPage() {
  this.closeRegisterModal()
  this.props.history.replace('/venueregister') //closes modal and loads venue registration form
}


  render() {
    const { getFieldDecorator } = this.props.form;
  


    return (
      <div>
        <Modal
          visible={this.props.store.registerModalStatus}
          footer={[
            <Button key={'venue'} onClick={() => this.loadVenueRegisterPage()}>Venue</Button>,
            <Button key={'artist'} onClick={() => this.loadArtistRegisterPage()}>Artist</Button>
          ]}
          onCancel={() => this.closeRegisterModal()}
        >
      </Modal>
      <Form onSubmit={(e) => this.submitLogin(e)} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input id="shit" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
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
//export default NormalLoginForm

