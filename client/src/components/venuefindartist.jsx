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
import { Table, Divider } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class VenueFindArtist extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        chosenArtist: '',
        city: ''
    }
  }


  

  clear() {
      this.setState({chosenArtist: '', city: ''})
      this.props.actions.clearArtist()
  }

  searchArtist(artistName) {
    this.setState({chosenArtist: artistName, city: ''})
    this.props.actions.chosenArtist(artistName)
  }

  searchArtistCity(city) {
    this.setState({city: city})
    this.props.actions.getArtistsByCity(city)

  }


    render() {
        // const dataSource = [{
        //     key: '1',
        //     name: 'Mike',
        //     age: 32,
        //     address: '10 Downing Street'
        //   }, {
        //     key: '2',
        //     name: 'John',
        //     age: 42,
        //     address: '10 Downing Street'
        //   }];

          const dataSource = this.props.store.searchedArtistCityList
          
          const columns = [{
            title: 'Artist Name',
            dataIndex: 'Artist name',
            key: 'Artist name',
          }, {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
          }, {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
          }];

            if (this.state.city.length) {
                return (
                    <div>
                    <button onClick={() => this.clear()}>go back</button>
                    <div>{this.props.store.searchedArtistCityList.map((artist, i) => 
                        <div key={i} onClick={() => this.searchArtist(artist.artist_name)}>{artist.artist_name}</div>
                    )}</div>
                    <Table dataSource={dataSource} columns={columns} />
                    </div>
                )
            }

            if (!this.state.chosenArtist.length) {
                return (
                    <div> 
                Find Artist
            <input className="artistsearch" placeholder="search by name"></input>
            <button onClick={() => this.searchArtist($('.artistsearch').val())}>search name</button>
            <input className="artistcitysearch" placeholder="search by city"></input>
            <button onClick={() => this.searchArtistCity($('.artistcitysearch').val())}>search city</button>
             </div>
                )
            }

            if (this.state.chosenArtist.length) {
                return(
                    <div>
                <button onClick={() => this.clear()}>go back</button>
                <ArtistEpk />
                </div>
                )
            }

    }
}

const mapStateToProps = state => (
    { store: state } // eslint-disable-line
  );

  const mapDispatchToProps = dispatch => (
    { actions: bindActionCreators(actions, dispatch) }
  );

  export default connect(mapStateToProps, mapDispatchToProps)(VenueFindArtist);