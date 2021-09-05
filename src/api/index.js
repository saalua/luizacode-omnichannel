const express = require('express')

const lojasRouter = require('./lojas')
const produtosRouter = require('./produtos')

const router = express.Router()

router.use('/lojas', lojasRouter)
router.use('/produtos', produtosRouter)

module.exports = router
