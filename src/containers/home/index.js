import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import AppBar from 'material-ui/AppBar'
import SvgIcon from 'material-ui/SvgIcon'

import Addresses from '../../components/addresses'
import {
  fetchAddresses,
  generateAddress,
  saveForm,
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
      style={{
        background: '#303030',
      }}
      titleStyle={{
        color: '#d4ff00',
      }}
      iconElementLeft={
        <SvgIcon
          viewBox='0 0 50 50'
          style={{width:47, height:47}}
        >
          <path d="M7.57273978,24.9983607 L7.57273978,0 L42.9287884,0 L42.9287884,24.9797239 L50.1119531,24.9797239 L25.091677,50 L0,24.908323 L7.57273978,24.9983607 Z M16.9171972,7.59434061 L16.9171972,30.0690845 L19.6651261,30.0690845 L19.6651261,32.5243115 L22.1162582,32.5243115 L22.1162582,29.9127214 L24.1224297,29.9127214 L24.1224297,32.3757614 L26.4921936,32.3757614 L26.4921936,30.0313909 C26.4921936,30.0313909 33.4964566,28.7982872 33.5002769,23.923158 C33.5040972,19.0480289 29.4299579,17.8217121 29.4299579,17.8217121 C29.4299579,17.8217121 32.8211122,16.6242599 32.8211122,13.0607675 C32.8211122,9.49727522 30.3400353,7.50944502 26.5087007,7.50944502 C26.4921936,7.50944502 26.5087007,5.49011106 26.5087007,5.49011106 L24.0273377,5.49011106 L24.0273377,7.55170666 L22.1208695,7.55170666 L22.1208695,5.47561725 L19.6313691,5.47561725 L19.6313691,7.48912389 L16.9171972,7.59434061 Z M22.5409639,25.6777322 L22.5409639,20.3358761 C22.5409639,20.3358761 27.481088,19.7134133 27.507427,22.6955041 C27.5396344,26.3420092 22.5409639,25.6777322 22.5409639,25.6777322 Z M22.5304095,16.1606728 L22.5304095,11.7654552 C22.5304095,11.7654552 27.0700161,11.2622202 27.0700161,13.4895287 C27.3620586,16.6948146 22.5304095,16.1606728 22.5304095,16.1606728 Z" style={{fill:'#D4FF00'}} />
        </SvgIcon>
      }
      iconStyleLeft={{
        position: 'absolute',
        left: 25,
        top: 0,
      }}
      iconElementRight={<span onClick={props.fetchTicker}>{`${presentAmount(props, props.conversion)}/Bitcoin`}</span>}
      iconStyleRight={{
        position: 'absolute',
        right: 25,
        top: 15,
        color: '#d4ff00',
      }}
    />
    <div
      style={{
        width: '36em',
        margin: '0 auto',
      }}
    >
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
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
