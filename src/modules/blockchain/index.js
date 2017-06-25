import serializeFormData from '../../lib/serializeFormData'

export const FETCH_TICKER = 'blockchain/FETCH_TICKER'
export const FETCH_TICKER_SUCCESS = 'blockchain/FETCH_TICKER_SUCCESS'
export const FETCH_ADDRESS = 'blockchain/FETCH_ADDRESS'
export const FETCH_ADDRESS_SUCCESS = 'blockchain/FETCH_ADDRESS_SUCCESS'
export const NOOP = 'blockchain/NOOP'

const CURRENCY = 'USD'
const BITCOIN_PRECISION = 100000000

const initialState = {
  ticker: {},
  dollars: null,
  conversion: null,
  symbol: '$',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TICKER_SUCCESS:
      const {
        symbol,
        last: _conversion,
      } = action.payload.data[CURRENCY]

      return {
        ...state,
        symbol,
        conversion: _conversion,
      }

    case FETCH_ADDRESS_SUCCESS:
      const {conversion} = state
      const {total_received} = action.payload.data
      const coins_received = total_received / BITCOIN_PRECISION
      const dollars = (coins_received * conversion)

      return {
        ...state,
        dollars,
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

export const fetchAddress = event => {
  event.preventDefault()
  const formData = new FormData(event.target)
  const formHash = serializeFormData(formData)
  const {address} = formHash

  return address
    ? {
        type: FETCH_ADDRESS,
        payload: {
          request: {
            url: `/rawaddr/${address}`,
          },
        },
      }
    : {type: NOOP}
}
