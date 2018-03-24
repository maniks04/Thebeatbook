import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import RaisedButton from 'material-ui/RaisedButton';
import { withRouter } from 'react-router';
import calendar from './calendar.jsx';
import Requests from './requests.jsx';
import { Modal, Button, Avatar, Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Venue extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      key:"1"
    }
  }

  logout() {
    this.props.actions.logout()
  }

  onSelect(info) {
    if (info.key === '4') {
      this.props.actions.logout()
    } else {
      this.setState({key: info.key})
    }
  }


  view() {
    let data = this.props.store.bookings;
    let key = this.state.key;
    if (key === '1') {
      return calendar(data)
    }
    if (key === '2') {
      return (<div>Find Artist</div>)
    }
    if (key === '3') {
      return (<Requests />)
    }
  }

  render() {
    return(
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
              <span>Find Artist</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="book"/>
              <span>Booking Requests</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="logout"/>
              <span>Logout</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item></Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.view()}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
          Ruber Ducky Dynasty!
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = state => (
    { store: state } // eslint-disable-line
  );

  const mapDispatchToProps = dispatch => (
    { actions: bindActionCreators(actions, dispatch) }
  );

  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Venue));