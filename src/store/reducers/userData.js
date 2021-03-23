const initialState = {
  name: '',
  email: '',
  accountType: '',
  transactions: []
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
    case 'USERDATA/SETTRANSACTIONS':
      return { ...state, transactions: payload }
    default:
      return state
  }
}

export default reducer
