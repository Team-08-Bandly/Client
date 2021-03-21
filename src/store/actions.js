import axios from '../config/axios'
import { toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

const config = {
  position: 'top-right',
  autoClose: 3500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined
}

export function setLoginTrue (payload) {
  return dispatch => {
    console.log(payload)
    dispatch({ type: 'LOGINSTATUS/LOGIN', payload })
  }
}

export function setLoginFalse () {
  return dispatch => {
    dispatch({ type: 'LOGINSTATUS/LOGOUT' })
    toast("You've logged out")
  }
}

export function setRegisterStatus (payload) {
  return dispatch => {
    dispatch({ type: 'LOGINSTATUS/REGISTER', payload })
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
  const success = () => toast('Login Success!', config)
  const failed = () => toast.error('Wrong email/password', config)

  return async dispatch => {
    try {
      const res = await axios({ requiresAuth: false }).post('/login', payload)
      success()
      dispatch(setLoginTrue(res.data.access_token))
    } catch (err) {
      console.log(err)
      failed()
    }
  }
}

export function register (payload) {
  const success = () => toast('Register Success')
  return async dispatch => {
    try {
      await axios({ requiresAuth: false }).post('/register', payload)
      dispatch(setRegisterStatus(true))
      success()
    } catch (err) {
      toast.error(err.response.data.message[0], config)
    }
  }
}

export function fetchBands () {
  return async dispatch => {
    try {
      const res = await axios({ requiresAuth: false }).get('/bands')
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
      const res = await axios().get('/users', {
        headers: { access_token: access_token }
      })
      const { data } = res
      console.log(data)
      dispatch(setAccountType(data.accountType))
      dispatch(setAccountName(data.name))
      dispatch(setAccountEmail(data.email))
    } catch (err) {
      console.log(err, '<<<error fetchUser')
    }
  }
}
