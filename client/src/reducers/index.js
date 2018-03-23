export const initialState = {
  loginModalStatus: false,
  registerModalStatus: false,
  artist: false,
  venue: false,
  bookings: [],
  loading: false,
  currentError: '',
  username: '',
  chosenArtist: '',
  searchedArtistCityList: []
}


const reducer = function(state = initialState, action) {
  switch (action.type) {
    case 'OPENLOGINMODAL' :
      return Object.assign({},  state, {loginModalStatus: true});
    case 'CLOSELOGINMODAL' :
      return Object.assign({},  state, {loginModalStatus: false});
    case 'OPENREGISTERMODAL' :
      return Object.assign({},  state, {registerModalStatus: true});
    case 'CLOSEREGISTERMODAL' :
      return Object.assign({},  state, {registerModalStatus: false})
    case 'LOADARTISTPAGE' :
      return Object.assign({},  state, {artist: true, username: action.payload})
    case 'LOADVENUEPAGE' :
      return Object.assign({},  state, {venue:true})
    case 'LOGOUT' :
      return Object.assign({},  state, {
        artist: false, venue: false, username: '', searchedArtistCityList: [], chosenArtist: ''})
    case 'TOGGLE_LOADING' :
      return Object.assign({}, state, {loading: !state.loading});
    case 'SET_BOOKINGS' :
      return Object.assign({}, state, {bookings: action.payload});
    case 'ERROR' :
      return Object.assign({}, state, {currentError: action.payload});
      case 'ClEARARTIST' :
      return Object.assign({}, state, {chosenArtist: '', searchedArtistCityList: ''});
    case 'CHOSENARTIST' :
      return Object.assign({}, state, {chosenArtist: action.payload});
    case 'RENDERARTISTCITYLIST' :
    return Object.assign({}, state, {searchedArtistCityList: action.payload});
    default :
      return state
  }
}

export default reducer;