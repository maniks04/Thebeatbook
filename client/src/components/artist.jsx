import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import RaisedButton from 'material-ui/RaisedButton';
import calendar from '../actions/calendar.js'
import TextField from 'material-ui/TextField';
import { Modal, Button } from 'antd';
import { Avatar } from 'antd';

class Artist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open:false
        }
    }

    componentDidMount() {
        console.log('mounted Artist')
    }



    logout() {
        this.props.history.replace('/')
    }


    render() {
        var a = 'https://cdn3.iconfinder.com/data/icons/business-vol-2/72/57-512.png'

        const styles = {
            manik: {
                height: 80,
                backgroundColor: 'white',
                borderBottom: 'solid',
                borderWidth: .5,
                borderColor: '#e6e6e6',
            },
            logo: {
                //float: 'right',
                height: 20,
                width: 20,
                display: 'inline',

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
                width: window.innerWidth/4,
                height: window.innerHeight*.75,
                left: window.innerWidth*3/8,
                top: window.innerHeight*1/8,
                textAlign: 'center'
            }
        }

        
        return(<div>
                    <nav style={styles.manik}>
                        {/* <div style={styles.manik} ></div> */}
                        <img src={a} style={styles.logo}></img>
                        <div style={styles.beatbook}>beatbook</div>
                    </nav>
                    <RaisedButton onClick={() => this.logout()} label='logout'/>


                    <div style={styles.loginbox}>
                    Artist Page
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

export default Artist
