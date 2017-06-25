import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {
  fetchTicker,
  fetchAddress,
} from '../../modules/blockchain'
import {generateAddress} from '../../modules/wallet'
import {presentAmount} from '../../lib/currencyHelpers'

const Home = props => (
  <div>
    <p>
      <button
        onClick={props.fetchTicker}
      >
        Fetch Dollar to coin conversion rate
      </button>
    </p>

    <p>{`${presentAmount(props, props.conversion)} per coin`}</p>

    <div>
      <form onSubmit={props.fetchAddress}>
        {props.generatedAddress
          ? <input
            key='default'
            type='text'
            name='address'
            placeholder='enter address'
            defaultValue={props.generatedAddress}
            />
          : <input
            type='text'
            name='address'
            placeholder='enter address'
            />
        }
        &nbsp;
        <button
          type='submit'
        >
          Fetch Address
        </button>
      </form>
      {props.dollars && <p>{presentAmount(props, props.dollars)}</p>}
    </div>

    <div>
      <button
        onClick={props.generateAddress}
      >
        Generate Address
      </button>
    </div>
  </div>
)

const mapStateToProps = state => ({
  symbol: state.blockchain.symbol,
  conversion: state.blockchain.conversion,
  dollars: state.blockchain.dollars,
  generatedAddress: state.wallet.generatedAddress,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchTicker,
  fetchAddress,
  generateAddress,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
