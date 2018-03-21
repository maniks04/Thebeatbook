import axios from 'axios';


 export const openLoginModal = () => ({type: 'OPENLOGINMODAL'});  
 export const closeLoginModal = () => ({type: 'CLOSELOGINMODAL'});
 export const openRegisterModal = () => ({type: 'OPENREGISTERMODAL'});
 export const closeRegisterModal = () => ({type: 'CLOSEREGISTERMODAL'});

//*************************************************
//FETCH BOOKINGS
const setArtistBookings = (bookings) => ({ type: 'SHOW_ARTIST_BOOKINGS', payload: bookings });

 export const fetchArtistBookings = (artistId) => {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: '/bookings',
      params: {
        artistId: artistId,
      },
    }).then(
      ({ data }) => {
        dispatch(setArtistBookings(data.events));
      },
      error => dispatch(badStuff(error))
    );
  };
};

export const badStuff = (error) => ({type: 'ERROR', payload: error});
const loading = () => ({type: 'TOGGLE_LOADING'});
//*************************************************