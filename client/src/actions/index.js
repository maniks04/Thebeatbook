import axios from 'axios';
const moment = require('moment');

export const openLoginModal = () => ({type: 'OPENLOGINMODAL'});
export const closeLoginModal = () => ({type: 'CLOSELOGINMODAL'});
export const openRegisterModal = () => ({type: 'OPENREGISTERMODAL'});
export const closeRegisterModal = () => ({type: 'CLOSEREGISTERMODAL'});
export const logout = () => ({type: 'LOGOUT'});
export const loadArtistPage = (data) => ({type: 'LOADARTISTPAGE'});
export const loadVenuePage = (data) => ({type: 'LOADVENUEPAGE'});

export const submitLogin = (username, password) => {
    return (dispatch) => axios({
            method: 'post',
            url: '/login',
            data: {
                username: username,
                password: password
            }
        }).then(res => {
            if (res.data === 'your passwords dont match' || res.data === 'Username does not exist') {
            } else {
                let type = res.data[0].user_type;
                dispatch(setBookings(res.data[2]))
                if (type === 'artist') {
                    dispatch(loadArtistPage(res.data))
                    dispatch(setArtist(res.data[1].artist_id))
                } if (type === 'venue') {
                    dispatch(loadVenuePage(res.data));
                    dispatch(setVenue(res.data[1].artist_id))
                }
            }
        }).catch(err => {
            console.log(err)
        })
}

export const setArtist = (artistId) => ({ type: 'SET_ARTISTID', payload: artistId });
export const setVenue = (venueId) => ({ type: 'SET_VENUEID', payload: venueId });
export const setBookings = (bookings) => ({ type: 'SET_BOOKINGS', payload: bookings });

export const addBook = (booking) => ({ type: 'ADD_BOOKING', payload: booking });


export const addBooking = (booking) => {
    return (dispatch) => {
       dispatch(addBook(booking))
    }
}

// ************************************************* TOGGLE LOADING BEORE ANY ACTIONS ; STILL NEED TO WRITE IT***




//*************************************************
//FETCH BOOKINGS
// const setArtistBookings = (bookings) => ({ type: 'SET_ARTIST_BOOKINGS', payload: bookings });

// export const fetchArtistBookings = (userId) => {
//   return (dispatch) => {
//     return axios({
//       method: 'get',
//       url: '/bookings',
//       params: {
//         userId: userId,
//       },
//     }).then(
//       ({ data }) => {
//         console.log('actions data', data)
//         dispatch(setArtistBookings(data.events));
//       },
//       error => dispatch(badStuff(error))
//     );
//   };
// };
//*************************************************



export const getArtistsByCity = (city) => {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: 'artist/city',
      params: {
        city: city
      }
    }).then(res => {
      dispatch(renderArtistCityList(res.data))
    }).catch(err => {
      console.error(err)
    })
  }
}

const renderArtistCityList = (list) => ({type: 'RENDERARTISTCITYLIST', payload: list})
