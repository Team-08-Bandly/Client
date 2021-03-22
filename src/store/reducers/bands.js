const initialState = {
  bands: [],
  band: {}
}

function reducer (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case 'BANDS/SETBANDS':
      return { ...state, bands: payload }
    case 'BANDS/SETBAND':
      return { ...state, band: payload }
    default:
      return state
  }
}
export default reducer
