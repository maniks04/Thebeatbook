import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import calendar from './calendar.jsx';
import Requests from './requests.jsx';
import SearchVenues from './searchVenues.jsx';
import { Modal, Button, Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
import WrappedNormalLoginForm from './epkEdit.jsx';
import EPKView from './epkView.jsx';
const moment = require('moment');

class Artist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '1',
    };
  }

  onSelect(info) {
    if (info.key === '6') {
      this.props.actions.logout();
    } else {
      this.setState({ key: info.key });
    }
  }

  view() {
    const { key } = this.state;
    const artist = this.props.store.artistId;
    if (key === '1') {
      return calendar(this.props.store.bookings, true);
    }
    if (key === '2') {
      return (<SearchVenues />);
    }
    if (key === '3') {
      return (<Requests />);
    }
    if (key === '4') {
      return (<EPKView artist={artist} />);
    }
    if (key === '5') {
      return (<WrappedNormalLoginForm artistID={artist} />);
    }
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>
          <div className="logo" />
          <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            mode="inline"
            onSelect={info =>this.onSelect(info)}
          >
            <Menu.Item key="1">
              <Icon type="calendar" />
              <span>Calendar</span>
            </Menu.Item>

            <Menu.Item key="2">
              <Icon type="search" />
              <span>Find Venue</span>
            </Menu.Item>

            <Menu.Item key="3">
              <Icon type="folder" />
              <span>My Requests</span>
            </Menu.Item>

            <SubMenu
              key="sub1"
              title={<span>
                <Icon type="team" />
                <span>EPK</span>
                </span> /* eslint-disable-line */}>
              <Menu.Item key="4">View</Menu.Item>
              <Menu.Item key="5">Edit</Menu.Item>
            </SubMenu>
            <Menu.Item key="6">
              <Icon type="logout" />
              <span>Logout</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item></Breadcrumb.Item>
            </Breadcrumb>
            <div style={
              { padding: 24,
                background: '#fff',
                minHeight: 360 }}>
              {this.view()}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
          Rubber Ducky Dynasty!
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => (
    { store: state }
  );

  const mapDispatchToProps = dispatch => (
    { actions: bindActionCreators(actions, dispatch) }
  );

export default connect(mapStateToProps, mapDispatchToProps)(Artist);
