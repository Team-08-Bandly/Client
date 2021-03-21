let initLoginStatus = false
if (localStorage.getItem('access_token')) {
  initLoginStatus = true
} else {
  initLoginStatus = false
}

const initialState = {
  isLoggedIn: initLoginStatus,
  registerStatus: false
}

function reducer (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case 'LOGINSTATUS/LOGIN':
      localStorage.setItem('access_token', payload)
      return { ...state, isLoggedIn: true }
    case 'LOGINSTATUS/LOGOUT':
      localStorage.removeItem('access_token')
      return { ...state, isLoggedIn: false }
    case 'LOGINSTATUS/REGISTER':
      return { ...state, registerStatus: payload }
    default:
      return state
  }
}

export default reducer
