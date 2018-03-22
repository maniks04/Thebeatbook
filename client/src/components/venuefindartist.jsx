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
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class VenueFindArtist extends React.Component {
  constructor(props) {
    super(props)
    
  }


  componentDidMount() {
      console.log(this.props.store)
  }

  view() {
      if (this.props.store.venueSearchedArtist === true) {
          return <ArtistEpk />
      } 
        if (this.props.store.searchedArtistCityList.length > 0) {
          return this.props.store.searchedArtistCityList.map((artist, i) => 
            <div key={i} onClick={() => this.searchArtist(artist.artist_name)}>{artist.artist_name}</div>
        )}
        else {
          return <div>search for a user!</div>
        }
       
  }


    searchArtist(artistName) {
        this.props.actions.getArtistEpk(artistName)
}

searchArtistCity() {
    this.props.actions.getArtistsByCity($('.artistcitysearch').val())
}


    render() {
        return (
            <div>
                Find Artist
            <input className="artistsearch" placeholder="search by name"></input>
            <button onClick={() => this.searchArtist($('.artistsearch').val())}>search name</button>
            <input className="artistcitysearch" placeholder="search by city"></input>
            <button onClick={() => this.searchArtistCity()}>search city</button>
            <div>{this.view()}</div>
              </div>
        )
    }
}

const mapStateToProps = state => (
    { store: state } // eslint-disable-line
  );

  const mapDispatchToProps = dispatch => (
    { actions: bindActionCreators(actions, dispatch) }
  );

  export default connect(mapStateToProps, mapDispatchToProps)(VenueFindArtist);