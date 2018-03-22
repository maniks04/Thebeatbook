import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import RaisedButton from 'material-ui/RaisedButton';
import calendar from './calendar.jsx'
import TextField from 'material-ui/TextField';
import { Modal, Button, Avatar, Layout, Menu, Breadcrumb, Icon } from 'antd';
import ArtistEpk from './artistepk.jsx'
import ArtistEpkEdit from './artistepkedit.jsx'
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Artist extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open:false,
      key:"1",
    }
  }



  componentDidMount() {
    console.log(this.props.store)
  }


    onSelect(info) {
      //console.log('key', info)
      info.key === '5' ? 
        this.props.actions.logout() :
          this.setState({key: info.key})  
    }


    view() {
      let key = this.state.key
      if (key === '1') {
        return calendar()
      }
      if (key === '2') {
        return <div> Find Venue </div>
      }
      if (key === '3') {
        this.props.actions.getArtistEpk(this.props.store.username)
        return <ArtistEpk />
      }
      if (key === '4') {
        return <ArtistEpkEdit />
      }
    //   if (key === '5') {
    //     this.props.actions.logout()  
    //   }
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
                <SubMenu key="sub1" title={<span><Icon type="team" /><span>EPK</span></span>}>
                  <Menu.Item key="3">View</Menu.Item>
                  <Menu.Item key="4">Edit</Menu.Item>
                </SubMenu>
                <Menu.Item key="5">
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
              Woooo Ant design!!!!!
              </Footer>
            </Layout>
          </Layout>
        );
  }
}

const mapStateToProps = state => (
    { store: state } // eslint-disable-line
  );

  const mapDispatchToProps = dispatch => (
    { actions: bindActionCreators(actions, dispatch) }
  );


export default connect(mapStateToProps, mapDispatchToProps)(Artist);
