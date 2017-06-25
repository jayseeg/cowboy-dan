const express = require('express')
const request = require('request')

const router = express.Router()

router.get('/*', (req, res, next) => {
  request({uri: `https://blockchain.info${req.url}`}).pipe(res)
})

module.exports = router
