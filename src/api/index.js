const express = require('express')

const lojasRouter = require('./lojas')
const produtosRouter = require('./produtos')
const pedidosRouter = require('./pedidos')
const clientesRouter = require('./clientes')

const router = express.Router()

router.use('/lojas', lojasRouter)
router.use('/produtos', produtosRouter)
router.use('/pedidos', pedidosRouter)
router.use('/clientes', clientesRouter)

module.exports = router
