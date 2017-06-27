export const FETCH_TICKER = 'blockchain/FETCH_TICKER'
export const FETCH_TICKER_SUCCESS = 'blockchain/FETCH_TICKER_SUCCESS'

const initialState = {
  conversion: null,
  symbol: '$',
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
