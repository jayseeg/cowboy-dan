const express = require('express')
const request = require('request')
const dotenv = require('dotenv')

const router = express.Router()

dotenv.load()

router.get('/*', (req, res, next) => {
  const {
    WALLET_GUID,
    WALLET_PASSWORD: password,
    WALLET_SECOND_PASSWORD: second_password,
  } = process.env

  request({
    uri: `http://localhost:3002/merchant/${WALLET_GUID}${req.url}`,
    qs: {
      password,
      second_password,
    },
  }).pipe(res)
})

module.exports = router
