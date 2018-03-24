import axios from 'axios';


export const openLoginModal = () => ({type: 'OPENLOGINMODAL'});
export const closeLoginModal = () => ({type: 'CLOSELOGINMODAL'});
export const openRegisterModal = () => ({type: 'OPENREGISTERMODAL'});
export const closeRegisterModal = () => ({type: 'CLOSEREGISTERMODAL'});
export const logout = () => ({type: 'LOGOUT'});
export const loadArtistPage = (data) => ({type: 'LOADARTISTPAGE'});
export const loadVenuePage = (data) => ({type: 'LOADVENUEPAGE'});

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
                console.log('dataaaaa',res.data)
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

export const setArtist = (artistId) => ({ type: 'SET_ARTISTID', payload: artistId });
export const setVenue = (venueId) => ({ type: 'SET_VENUEID', payload: venueId });
const setBookings = (bookings) => ({ type: 'SET_BOOKINGS', payload: bookings });
// ************************************************* TOGGLE LOADING BEORE ANY ACTIONS ; STILL NEED TO WRITE IT***

//     axios.post('/login', {
//         username: username,
//         password: password
//     }).then(res => {
//         console.log(res.data)
//     }).catch(err => {
//         console.log(err)
//     })   
// }

// export const login = (username, password) => {
//     return (dispatch) => {
//       return axios({
//         method: 'get',
//         url: '/login',
//         params: {
//           username: username,
//           password: password,
//         },
//       }).then(
//         results => {
//           if (results.data.error) {
//             alert(results.data.message);
//           } else {
//             dispatch(authenticate());
//             dispatch(fetchTrips(username));
//           }
//         },
//         error => {
//           console.log('error', error);
//           dispatch(badStuff(error));
//         }
//       )
//     }
// }

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
      console.log(res.data)
      dispatch(renderArtistCityList(res.data))
    }).catch(err => {
      console.log(err)
    })
  }
}

const renderArtistCityList = (list) => ({type: 'RENDERARTISTCITYLIST', payload: list})
