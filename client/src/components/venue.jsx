import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import RaisedButton from 'material-ui/RaisedButton';
import calendar from '../actions/calendar.js'


class Venue extends React.Component {
    constructor(props) {
        super(props) 
    }

componentDidMount() {
    console.log('mounted Venue')
    console.log(this.props.history)
}



logout() {
    this.props.history.replace('/')
    
}


    render() {
        let testEvent = {
            title: 'props test event',
            start: '2018-03-16T14:30:00',
            end: '2018-03-16T16:30:00'
        }
        return(<div>
            Venue Page
            <RaisedButton onClick={() => this.logout()} label='logout'/>
            {calendar(testEvent)}

            </div>)
    }
}

export default Venue