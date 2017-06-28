import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import AppBar from 'material-ui/AppBar'

import './style.css'

import Addresses from '../../components/addresses'
import Logo from '../../components/logos'
import {
  fetchAddresses,
  generateAddress,
  saveForm,
  clearForm,
} from '../../modules/addresses'
import {fetchTicker} from '../../modules/blockchain'
import {
  subscribeAddressIDs,
  dropUpdatedAddressIDs,
  disconnect,
} from '../../modules/blockchainWebsocket'
import {presentAmount} from '../../lib/currencyHelpers'

const Home = props => (
  <div>
    <AppBar
      title={<h2 style={{margin: 0}}>Sam's Lemonade</h2>}
      style={{background: '#303030'}}
      titleStyle={{color: '#d4ff00'}}
      iconElementLeft={
        <Link
          to="/"
          onClick={props.clearForm}
        >
          {Logo({style: {width:47, height:47}})}
        </Link>
      }
      iconStyleLeft={{
        position: 'absolute',
        left: 25,
        top: 0,
      }}
      iconElementRight={(
        <span onClick={props.fetchTicker}>
          {`${presentAmount(props, props.conversion)}/Bitcoin`}
        </span>
      )}
      iconStyleRight={{
        position: 'absolute',
        right: 25,
        top: 15,
        color: '#d4ff00',
      }}
    />
    <div className='Addresses-wrapper'>
      <div>
        <Addresses {...props} />
      </div>
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
  connected: state.blockchainWebsocket.connected,
  updatedAddressIDs: state.blockchainWebsocket.updatedAddressIDs,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAddresses,
  generateAddress,
  subscribeAddressIDs,
  saveForm,
  dropUpdatedAddressIDs,
  disconnect,
  fetchTicker,
  clearForm,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
