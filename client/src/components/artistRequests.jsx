import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import calendar from './calendar.jsx'
import { Modal, Tabs, List, Button, Layout, Menu, Breadcrumb, Icon, Spin } from 'antd';
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;

class Requests extends React.Component {

  constructor(props) {
    super(props)
    let bookings = this.props.store.bookings;
    this.state = {
      pending: bookings.filter((booking)=> booking.confirmed === 0),
      confirmed: bookings.filter((booking)=> booking.confirmed === 1),
      loadingMore: false,
      showLoadingMore: true,
    }
  }

  componentDidMount() {
  }


    onSelect(info) {
    }

    callback(key) {
      console.log(key);
    }


    render() {
    	const { confirmed, pending } = this.state;
    	// const loadMore = showLoadingMore ? (
     //  <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
     //    {loadingMore && <Spin />}
     //    {!loadingMore && <Button onClick={}>loading more</Button>}
     //  </div>
    // ) : null;
        return (
          <div>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="Confirmed" key="1">
                <List
        	        className="demo-loadmore-list"
        	        itemLayout="horizontal"
        	        dataSource={confirmed}
        	        renderItem={item => (
        	          <List.Item actions={[<a>edit</a>, <a>more</a>]}>
        	            <List.Item.Meta
        	              title={<a href="https://ant.design">{item.start_time}</a>}
        	              description="THIS IS A HARDCODED DESCRIPTION OF THE EVENT"
        	            />
        	          </List.Item>
                )}
                />
              </TabPane>
              <TabPane tab="Pending" key="2">
                <List
                  className="demo-loadmore-list"
                  itemLayout="horizontal"
                  dataSource={pending}
                  renderItem={item => (
                    <List.Item actions={[<a>edit</a>, <a>more</a>]}>
                      <List.Item.Meta
                        title={<a href="https://ant.design">{item.start_time}</a>}
                        description="THIS IS A HARDCODED DESCRIPTION OF THE EVENT"
                      />
                    </List.Item>
                  )}
                />
              </TabPane>
            </Tabs>
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


export default connect(mapStateToProps, mapDispatchToProps)(Requests);
