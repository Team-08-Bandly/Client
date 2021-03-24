import axios from '../config/axios'
import { toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

const config = require('../config/toastify')

export function setLoginTrue (payload) {
  return dispatch => {
    dispatch({ type: 'LOGINSTATUS/LOGIN', payload })
  }
}

export function setUserTransaction (payload) {
  return dispatch => {
    dispatch({ type: 'USERDATA/SETTRANSACTIONS', payload })
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

export function setBand (payload) {
  return dispatch => {
    dispatch({ type: 'BANDS/SETBAND', payload })
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
      const { data } = res
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
      dispatch(setAccountType(data.accountType))
      dispatch(setAccountName(data.name))
      dispatch(setAccountEmail(data.email))
    } catch (err) {
      console.log(err, '<<<error fetchUser')
    }
  }
}

export function fetchBand (payload) {
  return async dispatch => {
    try {
      const res = await axios().get(`/bands/${payload}`)
      const { data } = res
      dispatch(setBand(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export function fetchUserTransaction () {
  return async dispatch => {
    try {
      const res = await axios().get('/transactions/user')
      const { data } = res
      dispatch(setUserTransaction(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export function setStatusOrder (payload) {
  return async dispatch => {
    try {
      await axios().put('/transactions/', {
        status: 'success',
        snapToken: payload
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export function reviewRating (payload) {
  const { rating, review, id } = payload
  return async dispatch => {
    try {
      await axios().patch(`/transactions/${id}`, {
        rating,
        review
      })
      toast('Thanks for reviewing!', config)
    } catch (err) {
      console.log(err)
    }
  }
}
