const initialState = {
  bands: []
}

function reducer (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case 'BANDS/SETBANDS':
      return { ...state, bands: payload }
    default:
      return state
  }
}
export default reducer
