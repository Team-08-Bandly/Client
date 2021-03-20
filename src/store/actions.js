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
    dispatch({ type: 'ACCOUNTTYPE/SETACCOUNTTYPE', payload })
  }
}

export function login (payload) {
  return async dispatch => {
    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      dispatch(setLoginTrue(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export function fetchBands () {
  return async dispatch => {
    try {
      const res = await fetch('http://localhost:3000/bands')
      const data = await res.json()
      dispatch(setBands(data))
    } catch (err) {
      console.log(err)
    }
  }
}
