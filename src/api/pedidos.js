const express = require('express');
const router = express.Router()
const { check, validationResult } = require('express-validator');
const { restart } = require('nodemon');

const { pedido } = require('../models')
const { PedidoService, FINALIZAR_PEDIDO } = require('../services/pedidos')

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

router.post('/:idPedido/finalizar', async (req, res) => {
    const { idPedido } = req.params
    const resultado = await pedidoService.finalizarPedido(idPedido)
    switch(resultado) {
        case FINALIZAR_PEDIDO.FINALIZADO:
            res.status(200).send()
            break
        case FINALIZAR_PEDIDO.PEDIDO_NAO_ENCONTRADO:
            res.status(404).send()
            break
        case FINALIZAR_PEDIDO.STATUS_PEDIDO_IMPEDE_FINALIZAR:
            res.status(400).json({ errors: [{msg: 'Só é possível finalizar pedidos que estejam em andamento'}]})
            break
    }
})

module.exports = router