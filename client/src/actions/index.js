import axios from 'axios';


 export const openLoginModal = () => ({type: 'OPENLOGINMODAL'})
     
 export const closeLoginModal = () => ({type: 'CLOSELOGINMODAL'})

 export const openRegisterModal = () => ({type: 'OPENREGISTERMODAL'})
     
 export const closeRegisterModal = () => ({type: 'CLOSEREGISTERMODAL'})

 export const logout = () => ({type: 'LOGOUT'})

const loadArtistPage = (data) => ({type: 'LOADARTISTPAGE'})
 
const loadVenuePage = (data) => ({type: 'LOADVENUEPAGE'})

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
                console.log(res)
                if (res.data.user_type === 'artist') {
                    dispatch(loadArtistPage(res.data))
                } if (res.data.user_type === 'venue') {
                    dispatch(loadVenuePage(res.data))
                }
            } 
        }).catch(err => {
            console.log(err)
        })
    }
}

//     axios.post('/login', {
//         username: username,
//         password: password
//     }).then(res => {
//         console.log(res.data)
//     }).catch(err => {
//         console.log(err)
//     })   
// }




export const login = (username, password) => {
    return (dispatch) => {
      return axios({
        method: 'get',
        url: '/login',
        params: {
          username: username,
          password: password,
        },
      }).then(
        results => {
          if (results.data.error) {
            alert(results.data.message);
          } else {
            dispatch(authenticate());
            dispatch(fetchTrips(username));
          }
        },
        error => {
          console.log('error', error);
          dispatch(badStuff(error));
        }
      )
    }
}