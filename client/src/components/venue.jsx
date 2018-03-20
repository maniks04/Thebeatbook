import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import RaisedButton from 'material-ui/RaisedButton';
import calendar from './calendar.js';
import { Modal, Button, Avatar } from 'antd';


class Venue extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          open: false
        }
    }

componentDidMount() {
    console.log('mounted Venue')
    console.log(this.props.history)
}



logout() {
    this.props.history.replace('/')

}


    render() {
      var a = 'https://cdn3.iconfinder.com/data/icons/business-vol-2/72/57-512.png'
      const styles = {
        topbar: {
            height: 80,
            backgroundColor: 'white',
            borderBottom: 'solid',
            borderWidth: .5,
            borderColor: '#e6e6e6',
        },

        logo: {
          //float: 'left',
          height: 30,
          width: 30,
          display: 'inline'
        },

        beatbook: {
            fontSize: 20,
            fontFamily: 'system-ui',
            display: 'inline'
        },

        loginbox: {
            backgroundColor: 'white',
            position: 'absolute',
            borderStyle: 'solid',
            borderWidth: .5,
            borderColor: '#e6e6e6',
            width: window.innerWidth/2  ,
            height: window.innerHeight*.75,
            left: window.innerWidth*1/4,
            top: window.innerHeight*1/8,
            textAlign: 'center'
        },

        logout: {
          float: 'right'
        }
      }

      return(<div>
                <nav style ={styles.topbar}>
                  <img src={a} style={styles.logo}></img>
                  <div style={styles.beatbook}>beatbook</div>
                  <RaisedButton onClick={() => this.logout()} label='logout' style={styles.logout}/>
                </nav>

                <div style={styles.loginbox}>
                  Venue Page
                  <br />
                  <Avatar size="large" icon="user" />
                </div>

                <div>
                    <Button type="primary" onClick={() => this.setState({open: true})}>Open</Button>
                    <Modal
                    title="Events"
                    visible={this.state.open}
                    //   onOk={this.handleOk}
                    onCancel={() => this.setState({open:false})}>
                    {calendar()}
                    </Modal>
                </div>
              </div>)
    }
}

export default Venue
