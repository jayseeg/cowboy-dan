import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {RaisedButton} from 'material-ui'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Chip from 'material-ui/Chip'
import SvgIcon from 'material-ui/SvgIcon'
import SvgIconAutoRenew from 'material-ui/svg-icons/action/autorenew'

import {presentAmount} from '../../lib/currencyHelpers'

export default class Addresses extends Component {
  static propTypes = {
    fetchAddresses: PropTypes.func.isRequired,
    subscribeAddressIDs: PropTypes.func.isRequired,
    saveForm: PropTypes.func.isRequired,
    generateAddress: PropTypes.func.isRequired,
    dropUpdatedAddressIDs: PropTypes.func.isRequired,
    disconnect: PropTypes.func.isRequired,
    connecting: PropTypes.bool.isRequired,
    connected: PropTypes.bool.isRequired,
    generating: PropTypes.bool.isRequired,
    addresses: PropTypes.object.isRequired,
    addressIDs: PropTypes.array.isRequired,
    updatedAddressIDs: PropTypes.array,
    conversion: PropTypes.number,
  }

  static defaultProps = {
    BITCOIN_PRECISION: 100000000,
  }

  componentWillReceiveProps({updatedAddressIDs}) {
    const {
      fetchAddresses,
      addressIDs,
      dropUpdatedAddressIDs,
    } = this.props

    if (updatedAddressIDs.length) {
      const fetchAddressIDs = updatedAddressIDs.filter(id => {
        return addressIDs.indexOf(id) !== -1
      })

      fetchAddresses(fetchAddressIDs)
      dropUpdatedAddressIDs()
    }
  }

  renderAddresses = ({props, props: {addressIDs}}) => {
    return addressIDs.concat(null)
      .map((addressID, index) => index === addressIDs.length
        ? this.renderAddressField(props, index)
        : this.renderFilledAddressField(props, index, addressID)
      )
  }

  renderAddressField = (props, index) => (
    <div key={`address${index}null`} style={{position: 'relative', marginTop: 40}}>
      <FloatingActionButton
        mini
        onClick={this.saveForm(props)}
        backgroundColor='#d4ff00'
        style={{
          position: 'absolute',
          left: -65,
        }}
      >
        <ContentAdd />
      </FloatingActionButton>
      <TextField
        ref={C => this._newInput = C}
        hintText='enter address'
        fullWidth
        type='text'
        name={`address${index}`}
        onKeyUp={this.isValidInput(this._newInput) && this.saveForm(props)}
        onBlur={this.saveForm(props)}
        underlineFocusStyle={{
          borderBottomColor: '#d4ff00'
        }}
      />
    </div>
  )

  isValidInput = Input => Input
                          && (Input.input.value
                              && Input.input.value.trim().length === 34
                              && Input.input.value[0] === '1')

  renderFilledAddressField = (props, index, addressID) => (
    <div key={`address${index}`} style={{position: 'relative', marginTop: 40}}>
      <TextField
        hintText='enter address'
        fullWidth
        type='text'
        name={`address${index}`}
        defaultValue={addressID}
        errorText={!(addressID && addressID.length === 34 && addressID[0] === '1') && 'Addresses must be 34 characters starting with 1'}
        onKeyUp={this.saveForm(props)}
        onBlur={this.saveForm(props)}
        underlineFocusStyle={{
          borderBottomColor: '#d4ff00'
        }}
      />
      {this.renderAmounts({props, index, addressID})}
    </div>
  )

  renderAmounts = ({
    props, props: {
      addresses,
      conversion,
      BITCOIN_PRECISION,
    },
    addressID,
  }) => {
    const bitcoins = addresses[addressID]
                     && addresses[addressID].total_received / BITCOIN_PRECISION
    const rawDollars = conversion * bitcoins
    const dollars = presentAmount(props, rawDollars)
    const iconStyle = {
      width:20, height:20,
      position: 'absolute',
      top: 6,
      left: 8,
      fill: '#D4FF00',
    }
    const Icon = addresses[addressID]
      ? (
          <SvgIcon
            viewBox='0 0 50 50'
            style={iconStyle}
          >
            <path d="M7.57273978,24.9983607 L7.57273978,0 L42.9287884,0 L42.9287884,24.9797239 L50.1119531,24.9797239 L25.091677,50 L0,24.908323 L7.57273978,24.9983607 Z M16.9171972,7.59434061 L16.9171972,30.0690845 L19.6651261,30.0690845 L19.6651261,32.5243115 L22.1162582,32.5243115 L22.1162582,29.9127214 L24.1224297,29.9127214 L24.1224297,32.3757614 L26.4921936,32.3757614 L26.4921936,30.0313909 C26.4921936,30.0313909 33.4964566,28.7982872 33.5002769,23.923158 C33.5040972,19.0480289 29.4299579,17.8217121 29.4299579,17.8217121 C29.4299579,17.8217121 32.8211122,16.6242599 32.8211122,13.0607675 C32.8211122,9.49727522 30.3400353,7.50944502 26.5087007,7.50944502 C26.4921936,7.50944502 26.5087007,5.49011106 26.5087007,5.49011106 L24.0273377,5.49011106 L24.0273377,7.55170666 L22.1208695,7.55170666 L22.1208695,5.47561725 L19.6313691,5.47561725 L19.6313691,7.48912389 L16.9171972,7.59434061 Z M22.5409639,25.6777322 L22.5409639,20.3358761 C22.5409639,20.3358761 27.481088,19.7134133 27.507427,22.6955041 C27.5396344,26.3420092 22.5409639,25.6777322 22.5409639,25.6777322 Z M22.5304095,16.1606728 L22.5304095,11.7654552 C22.5304095,11.7654552 27.0700161,11.2622202 27.0700161,13.4895287 C27.3620586,16.6948146 22.5304095,16.1606728 22.5304095,16.1606728 Z" style={{fill:'#D4FF00'}} />
          </SvgIcon>
        )
      : <SvgIconAutoRenew style={iconStyle} />
    const text = addresses[addressID]
      ? `${bitcoins} bitcoins or ${dollars}`
      : 'no word yet'

    return (
      <Chip
        onClick={this.fetchAddresses(props)}
        style={{
          paddingLeft: 24,
          cursor: 'pointer',
        }}
      >
        {Icon}
        {text}
      </Chip>
    )
  }

  saveForm = ({
    saveForm,
    disconnect,
  }) => () => {
    disconnect()
    saveForm(this._form)
  }

  subscribeAddressIDs = ({
    subscribeAddressIDs,
    addressIDs,
  }) => () => subscribeAddressIDs(addressIDs)

  fetchAddresses = ({
    addressIDs,
    fetchAddresses,
  }) => event => {
    event.preventDefault()

    fetchAddresses(addressIDs)
  }

  render() {
    const {
      props, props: {
        addressIDs,
        generateAddress,
        connecting,
        connected,
        generating,
      }
    } = this
    const disabled = !addressIDs.length
    const buttonPlural = addressIDs.length > 1
      ? 'es'
      : ''
    const subscribedD = connected
      ? 'd'
      : ''

    return (
      <div style={{textAlign: 'left'}}>
        <form
          ref={C => this._form = C}
          onSubmit={this.fetchAddresses(props)}
        >
          <div>
            <RaisedButton
              label='Generate Address'
              onClick={generateAddress}
              disabled={generating}
              style={{
                marginRight: '1em'
              }}
            />
            <RaisedButton
              label={`Subscribe${subscribedD} to Address${buttonPlural}`}
              type='button'
              onClick={this.subscribeAddressIDs(props)}
              disabled={disabled || connecting}
              secondary={connected}
              style={{
                marginRight: '1em'
              }}
            />
            <RaisedButton
              label={`Fetch Address${buttonPlural}`}
              type='submit'
              {...{disabled}}
            />
          </div>
          <div>
            {this.renderAddresses({props})}
          </div>
        </form>
      </div>
    )
  }
}
