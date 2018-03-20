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
        }
    }

    onCollapse(collapsed) {
      console.log(collapsed);
      this.setState({ collapsed });
    }

    logout() {
        this.props.history.replace('/')
    }


    render() {
        return (
          <Layout style={{ minHeight: '100vh' }}>
            <Sider>
              <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
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

// var a = 'https://cdn3.iconfinder.com/data/icons/business-vol-2/72/57-512.png'
// const styles = {
//     topBar: {
//         height: 80,
//         backgroundColor: 'white',
//         borderBottom: 'solid',
//         borderWidth: .5,
//         borderColor: '#e6e6e6',
//     },
//
//     logo: {
//         //float: 'right',
//         height: 30,
//         width: 30,
//         display: 'inline',
//
//     },
//
//     beatbook: {
//         fontSize: 20,
//         fontFamily: 'system-ui',
//         display: 'inline'
//     },
//
//     innerbox: {
//       maxWidth: 1200,
//       margin: 'auto',
//       width: '80%'
//     },
//
//     loginbox: {
//         backgroundColor: 'white',
//         position: 'absolute',
//         borderStyle: 'solid',
//         borderWidth: .5,
//         borderColor: '#e6e6e6',
//         width: window.innerWidth/4,
//         height: window.innerHeight*.75,
//         left: window.innerWidth*3/8,
//         top: window.innerHeight*1/8,
//         textAlign: 'center'
//     },
//
//     logout: {
//       float: 'right'
//     }
// }
