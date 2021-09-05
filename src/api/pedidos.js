const express = require('express');
const router = express.Router()

const { pedido } = require('../models')
const PedidoService = require('../services/pedidos')

const pedidoService = new PedidoService(pedido)

router.get('/', async (req, res) => {
  const pedidos = await pedidoService.get()
  res.status(200).json(pedidos)
})

module.exports = router