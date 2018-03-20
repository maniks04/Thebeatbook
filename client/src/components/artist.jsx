import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import RaisedButton from 'material-ui/RaisedButton';
import calendar from './calendar.js'
import TextField from 'material-ui/TextField';
import { Modal, Button, Avatar, Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Artist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open:false,
            key:1,
        }
    }

    logout() {
        this.props.history.replace('/')
    }

    onSelect(info) {
      console.log('key', info)
      this.setState({
        key: info.key
      })
    }

    render() {
        return (
          <Layout style={{ minHeight: '100vh' }}>
            <Sider>
              <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onSelect={(info)=>this.onSelect(info)} >
                <Menu.Item key="1">
                  <Icon type="calendar" />
                  <span>Calendar</span>
                </Menu.Item>
                <Menu.Item key="2">
                  <Icon type="plus" />
                  <span>Find Venue</span>
                </Menu.Item>
                <Menu.Item key="3">
                  <Icon type="user"/>
                  <span>EPK</span>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>

              <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item></Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                  {calendar()}
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>
              Woooo Ant design!!!!!
              </Footer>
            </Layout>
          </Layout>
        );
  }
}

export default Artist
