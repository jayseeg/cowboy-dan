import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Addresses from '../../components/addresses'
import {
  fetchAddresses,
  generateAddress,
  saveForm,
} from '../../modules/addresses'
import {
  subscribeAddressIDs,
  dropUpdatedAddressIDs,
} from '../../modules/blockchainWebsocket'
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
  symbol: state.blockchain.symbol,
  conversion: state.blockchain.conversion,
  dollars: state.blockchain.dollars,
  addressIDs: state.addresses.addressIDs,
  generating: state.addresses.generating,
  addresses: state.addresses.addresses,
  coinsReceived: state.blockchainWebsocket.coinsReceived,
  connecting: state.blockchainWebsocket.connecting,
  updatedAddressIDs: state.blockchainWebsocket.updatedAddressIDs,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAddresses,
  generateAddress,
  subscribeAddressIDs,
  saveForm,
  dropUpdatedAddressIDs,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
