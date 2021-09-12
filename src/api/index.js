const express = require('express')

const lojasRouter = require('./lojas')
const produtosRouter = require('./produtos')
const pedidosRouter = require('./pedidos')
const clientesRouter = require('./clientes')
const clientesPedidosRouter = require('./clientes_pedidos')

const router = express.Router()

router.use('/lojas', lojasRouter);
router.use('/produtos', produtosRouter);
router.use('/pedidos', pedidosRouter);
router.use('/clientes', clientesRouter);
router.use('/clientes', clientesPedidosRouter);

module.exports = router
