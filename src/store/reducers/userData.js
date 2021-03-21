const initialState = {
  name: '',
  email: '',
  accountType: ''
}

function reducer (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case 'USERDATA/SETACCOUNTTYPE':
      return { ...state, accountType: payload }
    case 'USERDATA/SETNAME':
      return { ...state, name: payload }
    case 'USERDATA/SETEMAIL':
      return { ...state, email: payload }
    default:
      return state
  }
}

export default reducer
