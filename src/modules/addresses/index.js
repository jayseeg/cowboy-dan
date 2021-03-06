import {replace} from 'react-router-redux'

import serializeFormData from '../../lib/serializeFormData'

export const FETCH_ADDRESSES = 'addresses/FETCH_ADDRESSES'
export const FETCH_ADDRESSES_SUCCESS = 'addresses/FETCH_ADDRESSES_SUCCESS'
export const SAVE_FORM = 'addresses/SAVE_FORM'
export const GENERATE_ADDRESS = 'addresses/GENERATE_ADDRESS'
export const GENERATE_ADDRESS_SUCCESS = 'addresses/GENERATE_ADDRESS_SUCCESS'

const initialState = {
  addressIDs: [],
  generating: false,
  addresses: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADDRESSES_SUCCESS:
      const latestAddresses = action.payload.data.addresses
        .reduce((addresses, address) => {
          addresses[address.address] = address
          return addresses
        }, {})

      return {
        ...state,
        addresses: {
          ...state.addresses,
          ...latestAddresses,
        }
      }

    case SAVE_FORM:
      const {addressIDs} = action

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

export const saveForm = form => (dispatch, store) => {
  const formData = new FormData(form)
  const formHash = serializeFormData(formData)
  const addressIDs = Object.keys(formHash)
    .filter(key => key.indexOf('address') !== -1)
    .map(key => formHash[key].trim())
    .filter(id => id)

  dispatch({
    type: SAVE_FORM,
    addressIDs,
  })
  dispatch(replace(`/addresses/${addressIDs.join(',')}`))
}

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

export const saveUrl = () => (dispatch, getState) => {
  const {routing: {location: {pathname}}} = getState()
  const addressesIndex = pathname.lastIndexOf('addresses/') + 10
  const addressesString = pathname.substr(addressesIndex)
  if (!addressesString.length) return
  const urlAddressIDs = addressesString.split(',')

  dispatch({
    type: SAVE_FORM,
    addressIDs: urlAddressIDs,
  })
  dispatch(fetchAddresses(urlAddressIDs))
}

export const clearForm = () => ({
  type: SAVE_FORM,
  addressIDs: [],
})
