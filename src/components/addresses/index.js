import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {RaisedButton} from 'material-ui'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Chip from 'material-ui/Chip'
import SvgIconAutoRenew from 'material-ui/svg-icons/action/autorenew'

import './style.css'

import Logo from '../../components/logos'
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
    <div
      key={`address${index}null`}
      style={{
        position: 'relative',
        marginTop: 40,
      }}
    >
      <FloatingActionButton
        mini
        onClick={this.saveForm(props)}
        className='FloatingActionButton'
        backgroundColor='#d4ff00'
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
        underlineFocusStyle={{borderBottomColor: '#d4ff00'}}
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
        errorText={this.errorText(addressID)}
        onKeyUp={this.saveForm(props)}
        onBlur={this.saveForm(props)}
        underlineFocusStyle={{
          borderBottomColor: '#d4ff00'
        }}
      />
      {this.renderAmounts({props, index, addressID})}
    </div>
  )

  errorText = addressID => !(addressID
                             && addressID.length === 34
                             && addressID[0] === '1'
                           ) && 'Addresses must be 34 characters starting with 1'

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
    const Icon = addresses[addressID]
      ? Logo({className: 'Chip-icon'})
      : <SvgIconAutoRenew className='Chip-icon' color='#D4FF00' />
    const text = addresses[addressID]
      ? `${bitcoins} bitcoins or ${dollars}`
      : 'no word yet'

    return (
      <Chip
        className='Chip'
        style={{paddingLeft: 24}}
        onClick={this.fetchAddresses(props)}
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
      <div className='Form-wrapper'>
        <form
          ref={C => this._form = C}
          onSubmit={this.fetchAddresses(props)}
        >
          <div>
            <RaisedButton
              className='Raised-button'
              label='Generate Address'
              onClick={generateAddress}
              disabled={generating}
            />
            <RaisedButton
              className='Raised-button'
              label={`Subscribe${subscribedD} to Address${buttonPlural}`}
              type='button'
              onClick={this.subscribeAddressIDs(props)}
              disabled={disabled || connecting}
              secondary={connected}
            />
            <RaisedButton
              className='Raised-button'
              label={`Fetch Address${buttonPlural}`}
              type='submit'
              style={{marginRight: 0}}
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
