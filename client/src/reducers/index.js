export const initialState = {
    loginModalStatus: false,
    registerModalStatus: false
}


const reducer = function(state = initialState, action) {
  switch (action.type) {
    case 'OPENLOGINMODAL' :
      return Object.assign({},  state, {loginModalStatus:true})
    case 'CLOSELOGINMODAL' :
      return Object.assign({},  state, {loginModalStatus:false})
    case 'OPENREGISTERMODAL' :
      return Object.assign({},  state, {registerModalStatus:true})
    case 'CLOSEREGISTERMODAL' :
      return Object.assign({},  state, {registerModalStatus:false})
    default :
      return state
}

}

export default reducer