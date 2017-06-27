import serializeFormData from '../../lib/serializeFormData'

export const FETCH_TICKER = 'blockchain/FETCH_TICKER'
export const FETCH_TICKER_SUCCESS = 'blockchain/FETCH_TICKER_SUCCESS'
export const FETCH_ADDRESSES = 'blockchain/FETCH_ADDRESSES'
export const FETCH_ADDRESSES_SUCCESS = 'blockchain/FETCH_ADDRESSES_SUCCESS'
export const SAVE_FORM = 'blockchain/SAVE_FORM'
export const GENERATE_ADDRESS = 'blockchain/GENERATE_ADDRESS'
export const GENERATE_ADDRESS_SUCCESS = 'blockchain/GENERATE_ADDRESS_SUCCESS'

const initialState = {
  conversion: null,
  symbol: '$',
  addressIDs: [],
  generating: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TICKER_SUCCESS:
      const {
        symbol,
        last: conversion,
      } = action.payload.data.USD

      return {
        ...state,
        symbol,
        conversion,
      }

    case FETCH_ADDRESSES_SUCCESS:
      return state

    case SAVE_FORM:
      const {form} = action
      const formData = new FormData(form)
      const formHash = serializeFormData(formData)
      const addressIDs = Object.keys(formHash)
        .filter(key => key.indexOf('address') !== -1)
        .map(key => formHash[key])
        .filter(id => id)

      return {
        ...state,
        addressIDs,
      }

    case GENERATE_ADDRESS:
      return {
        ...state,
        generating: true,
      }

    case GENERATE_ADDRESS_SUCCESS:
      const {address} = action.payload.data

      return {
        ...state,
        addressIDs: state.addressIDs.concat(address),
        generating: false,
      }

    default:
      return state
  }
}

export const fetchTicker = () => {
  return {
    type: FETCH_TICKER,
    payload: {
      request: {
        url: `/ticker`,
      },
    },
  }
}

export const saveForm = form => ({
  type: SAVE_FORM,
  form,
})

export const fetchAddresses = addressIDs => ({
  type: FETCH_ADDRESSES,
  payload: {
    request: {
      url: `/multiaddr?active=${addressIDs.join('|')}`,
    },
  },
})

export const generateAddress = () => ({
  type: GENERATE_ADDRESS,
  payload: {
    client: 'wallet',
    request: {
      url: `/new_address`,
    },
  }
})
