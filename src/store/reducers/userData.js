const initialState = {
  name: '',
  email: '',
  accountType: ''
}

function reducer (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case 'ACCOUNTTYPE/SETACCOUNTTYPE':
      return { ...state, accountType: payload }
    default:
      return state
  }
}

export default reducer
