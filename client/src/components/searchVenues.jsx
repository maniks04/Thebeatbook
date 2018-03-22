import { Input } from 'antd';
const Search = Input.Search;
import axios from 'axios';

class Requests extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      venues: []
    }
  }

  componentDidMount() {
    console.log('logging the store!:::', this.props.store.bookings);
    //cities
  }


  onSearch(info) {
    axios.get('/venues', {
      city: info
    }).then(res => {
      console.log(res.data)
      this.setState({
        venues: res.data
      })
    }).catch(err => {
      console.log('error', err)
    })
  }



  render() {
    return (
      <Search
      placeholder="Enter A City Here"
      onSearch={value => this.onSearch(value)}
      enterButton
      />
    )
  }
}

const mapStateToProps = state => (
    { store: state } // eslint-disable-line
  );

  const mapDispatchToProps = dispatch => (
    { actions: bindActionCreators(actions, dispatch) }
  );


export default connect(mapStateToProps, mapDispatchToProps)(SearchVenues);
