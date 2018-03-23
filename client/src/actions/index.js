import axios from 'axios';


 export const openLoginModal = () => ({type: 'OPENLOGINMODAL'});
 export const closeLoginModal = () => ({type: 'CLOSELOGINMODAL'});
 export const openRegisterModal = () => ({type: 'OPENREGISTERMODAL'});
 export const closeRegisterModal = () => ({type: 'CLOSEREGISTERMODAL'});


export const logout = () => ({type: 'LOGOUT'});
const loadArtistPage = (data) => ({type: 'LOADARTISTPAGE'});
const loadVenuePage = (data) => ({type: 'LOADVENUEPAGE'});

export const submitLogin = (username, password) => {
    return(dispatch) => {
        return axios({
            method: 'post',
            url: '/login',
            data: {
                username: username,
                password: password
            }
        }).then(res => {
            if (res.data === 'your passwords dont match' || res.data === 'Username does not exist') {
                console.log(res.data)
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
}

const setArtist = (artistId) => ({ type: 'SET_ARTISTID', payload: artistId });
const setVenue = (venueId) => ({ type: 'SET_VENUEID', payload: venueId });
const setBookings = (bookings) => ({ type: 'SET_BOOKINGS', payload: bookings });
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
//FETCH EPK ---- Probably need to use a 'loading' transition here
// const setArtistBookings = (bookings) => ({ type: 'SET_ARTIST_BOOKINGS', payload: bookings });



//may be able to remove badstuff()
export const badStuff = (error) => ({type: 'ERROR', payload: error});
const loading = () => ({type: 'TOGGLE_LOADING'});
//*************************************************
