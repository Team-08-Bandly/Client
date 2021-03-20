import axios from '../config/axios'

export function setLoginTrue (payload) {
  return dispatch => {
    dispatch({ type: 'ISLOGGEDIN/LOGIN', payload })
  }
}

export function setLoginFalse () {
  return dispatch => {
    dispatch({ type: 'ISLOGGEDIN/LOGOUT' })
  }
}

export function setBands (payload) {
  return dispatch => {
    dispatch({ type: 'BANDS/SETBANDS', payload })
  }
}

export function setAccountType (payload) {
  return dispatch => {
    dispatch({ type: 'USERDATA/SETACCOUNTTYPE', payload })
  }
}

export function setAccountName (payload) {
  return dispatch => {
    dispatch({ type: 'USERDATA/SETNAME', payload })
  }
}

export function setAccountEmail (payload) {
  return dispatch => {
    dispatch({ type: 'USERDATA/SETEMAIL', payload })
  }
}

export function login (payload) {
  return async dispatch => {
    try {
      const res = await axios.post('/login', payload)
      dispatch(setLoginTrue(res.data.access_token))
    } catch (err) {
      console.log(err)
    }
  }
}

export function register (payload) {
  console.log(payload)
  return async dispatch => {
    try {
      await axios.post('/register', payload)
    } catch (err) {
      console.log(err)
    }
  }
}

export function fetchBands () {
  return async dispatch => {
    try {
      const res = await axios.get('/bands')
      const { data } = res.data
      dispatch(setBands(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export function fetchUser () {
  return async dispatch => {
    try {
      const access_token = localStorage.getItem('access_token')
      const res = await axios.get('/users', { headers: { access_token } })
      const { data } = res.data
      dispatch(setAccountType(data.accountType))
      dispatch(setAccountName(data.name))
      dispatch(setAccountEmail(data.email))
    } catch (err) {
      console.log(err)
    }
  }
}
