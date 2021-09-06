const express = require('express');
const router = express.Router()
const { check, validationResult } = require('express-validator')

const { pedido } = require('../models')
const PedidoService = require('../services/pedidos')

const pedidoService = new PedidoService(pedido)

router.get('/',
    check('idCliente')
        .not().isEmpty()
        .matches(/\d/)
        .withMessage('Para consultar os pedidos é obrigatório informar o parâmetro idCliente que precisa ser um valor numérico'),
    async (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { idCliente } = req.query
        const pedidos = await pedidoService.getAllByIdCliente(idCliente)
        res.status(200).json(pedidos)
    })

module.exports = router