const express = require('express')

const lojasRouter = require('./lojas')
const produtosRouter = require('./produtos')
const pedidosRouter = require('./pedidos')

const router = express.Router()

router.use('/lojas', lojasRouter)
router.use('/produtos', produtosRouter)
router.use('/pedidos', pedidosRouter)

module.exports = router
