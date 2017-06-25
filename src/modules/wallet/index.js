export const GENERATE_ADDRESS = 'wallet/GENERATE_ADDRESS'
export const GENERATE_ADDRESS_SUCCESS = 'wallet/GENERATE_ADDRESS_SUCCESS'

const initialState = {
  generatedAddress: undefined,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GENERATE_ADDRESS_SUCCESS:
      const {address: generatedAddress} = action.payload.data
      return {
        ...state,
        generatedAddress,
      }

    default:
      return state
  }
}

export const generateAddress = () => {
  return {
    type: GENERATE_ADDRESS,
    payload: {
      client: 'wallet',
      request: {
        url: `/new_address`,
      },
    },
  }
}
