const express = require('express');
const router = express.Router()
const { pedido } = require('../models');
const { PedidoService } = require('../services/pedidos');
const pedidoService = new PedidoService(pedido);

router.get('/:idPedido',
    async (req, res) => {
        const { idPedido } = req.params
        const pedidoEncontrado = await pedidoService.getById(idPedido);
        if (pedidoEncontrado == null) {
            res.status(404).send()
        } else {
            res.status(200).json({
                data: pedidoEncontrado
            });
        }
    });

router.get('/',
    async (req, res) => {
        const pedidos = await pedidoService.get();
        res.status(200).json({
            data: pedidos
        });
    });

router.patch('/:idPedido/retirado',
    async (req, res) => {
        
        const idPedido = req.params.idPedido;
        const validacaoPedido = await validaIdPedido(idPedido);

        if (!validacaoPedido.isValid) {
            return res.status(400).json({ errors: validacaoPedido.errors })
        }

        const resultUpdatePedido = await pedidoService.retirarPedido(idPedido);

        if (resultUpdatePedido != "RETIRADO") {
            return res.status(400).json({errors: [{msg:resultUpdatePedido}]});
        }

        return res.status(200).json({data: resultUpdatePedido});

    })

module.exports = router


async function validaIdPedido(idPedido) {

    const result = {
        isValid: true,
        errors: [],
        data: null
    }

    if (isNaN(idPedido)) {
        result.isValid = false;
        result.errors = [{param: "idPedido", "location": "path", msg:"idPedido deve ser numerico (" + idPedido + ")"}];
        return result;
    } 

    return result; 
}

