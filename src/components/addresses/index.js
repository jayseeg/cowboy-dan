import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Addresses extends Component {
  static propTypes = {
    fetchAddresses: PropTypes.func.isRequired,
    subscribeAddressIDs: PropTypes.func.isRequired,
    saveForm: PropTypes.func.isRequired,
    generateAddress: PropTypes.func.isRequired,
    connecting: PropTypes.bool.isRequired,
    generating: PropTypes.bool.isRequired,
    addressIDs: PropTypes.array,
  }

  renderAddresses = ({props, props: {addressIDs}}) => {
    return addressIDs.concat(null)
      .map((addressID, index) => index === addressIDs.length
        ? this.renderAddressField(props, index)
        : this.renderFilledAddressField(props, index, addressID)
      )
  }

  renderAddressField = (props, index) => (
    <div key={`address${index}null`}>
      <input
        type='text'
        name={`address${index}`}
        placeholder='enter address'
        onBlur={this.saveForm(props)}
      />
    </div>
  )

  renderFilledAddressField = (props, index, addressID) => (
    <div key={`address${index}`}>
      <input
        type='text'
        name={`address${index}`}
        placeholder='enter address'
        defaultValue={addressID}
        onBlur={this.saveForm(props)}
      />
    </div>
  )

  saveForm = ({saveForm}) => () => saveForm(this._form)

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
        generating,
      }
    } = this
    const disabled = !addressIDs.length
    const buttonPlural = addressIDs.length > 1
      ? 'es'
      : ''

    return (
      <div>
        <form
          ref={C => this._form = C}
          onSubmit={this.fetchAddresses(props)}
        >
          <div style={{float:'left'}}>
            <button
              type='button'
              onClick={this.saveForm(props)}
              {...{disabled}}
            >
              Add an Address
            </button>
            <button
              onClick={generateAddress}
              disabled={generating}
            >
              Generate Address
            </button>
            <button
              type='button'
              onClick={this.subscribeAddressIDs(props)}
              disabled={disabled || connecting}
            >
              Subscribe to Address{buttonPlural}
            </button>
            <button
              type='submit'
              {...{disabled}}
            >
              Fetch Address{buttonPlural}
            </button>
          </div>
          <div style={{float:'right'}}>
            {this.renderAddresses({props})}
          </div>
        </form>
      </div>
    )
  }
}
