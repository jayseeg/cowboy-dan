import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Addresses from '../../components/addresses'
import {
  fetchAddresses,
  generateAddress,
  saveForm,
} from '../../modules/blockchain'
import {subscribeAddressIDs} from '../../modules/blockchainWebsocket'
import {presentAmount} from '../../lib/currencyHelpers'

const Home = props => (
  <div>
    <p>{`Trading at ${presentAmount(props, props.conversion)}/Bitcoin`}</p>
    <div style={{width: 600, margin: '0 auto'}}>
      <Addresses {...props} />
    </div>
  </div>
)

const mapStateToProps = state => ({
  addressIDs: state.blockchain.addressIDs,
  symbol: state.blockchain.symbol,
  conversion: state.blockchain.conversion,
  dollars: state.blockchain.dollars,
  generating: state.blockchain.generating,
  coinsReceived: state.blockchainWebsocket.coinsReceived,
  connecting: state.blockchainWebsocket.connecting,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAddresses,
  generateAddress,
  subscribeAddressIDs,
  saveForm,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
