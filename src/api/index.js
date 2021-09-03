const express = require('express')

const lojasRouter = require('./lojas')

const router = express.Router()

router.use('/lojas', lojasRouter)
module.exports = router
