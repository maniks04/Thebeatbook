import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import calendar from './calendar.jsx'
import { Modal, List, Button, Avatar, Layout, Menu, Breadcrumb, Icon, Spin } from 'antd';
const SubMenu = Menu.SubMenu;

class Requests extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: this.props.store.bookings,
      loadingMore: false,
      showLoadingMore: true,
    }
  }

  componentDidMount() {
    console.log('logging the store!:::', this.props.store.bookings);
  }


    onSelect(info) {
    }



    render() {
    	const { data } = this.state;
    	// const loadMore = showLoadingMore ? (
     //  <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
     //    {loadingMore && <Spin />}
     //    {!loadingMore && <Button onClick={}>loading more</Button>}
     //  </div>
    // ) : null;
        return (
          <List
	        className="demo-loadmore-list"
	        itemLayout="horizontal"
	        
	        dataSource={data}
	        renderItem={item => (
	          <List.Item actions={[<a>edit</a>, <a>more</a>]}>
	            <List.Item.Meta
	              title={<a href="https://ant.design">{item.start_time}</a>}
	              description="THIS IS A HARDCODED DESCRIPTION OF THE EVENT"
	            />
	            <div></div>
	          </List.Item>
          )}
      />
        );
  }
}

const mapStateToProps = state => (
    { store: state } // eslint-disable-line
  );

  const mapDispatchToProps = dispatch => (
    { actions: bindActionCreators(actions, dispatch) }
  );


export default connect(mapStateToProps, mapDispatchToProps)(Requests);
