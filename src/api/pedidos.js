const express = require('express');
const router = express.Router()
const { pedido } = require('../models');
const { PedidoService } = require('../services/pedidos');
const pedidoService = new PedidoService(pedido);

const auth = require('./validateAuth')

router.get('/:idPedido', auth,
    async (req, res) => {

/*
    #swagger.tags = ['Pedidos']
    #swagger.description = 'Endpoint para a consulta de pedidos do cliente por ID.' 
    #swagger.security = [{
        "apiKeyAuth":[]
    }]
    #swagger.responses[200] = {
    description: 'Consulta realizada com sucesso.'
    }
    #swagger.responses[404] = {
    description: 'Pedido não encontrado.'
    }
*/

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

router.get('/', auth,
    async (req, res) => {

/*
    #swagger.tags = ['Pedidos']
    #swagger.description = 'Endpoint para a consulta de todos os pedidos do cliente.' 
    #swagger.security = [{
        "apiKeyAuth":[]
    }]
    #swagger.responses[200] = {
    description: 'Consulta realizada com sucesso.'
*/

        const pedidos = await pedidoService.get();
        res.status(200).json({
            data: pedidos
        });
    });

router.patch('/:idPedido/retirado', auth,
    async (req, res) => {

/*
    #swagger.tags = ['Pedidos']
    #swagger.description = 'Endpoint para retirar o pedido do cliente.' 
    #swagger.security = [{
        "apiKeyAuth":[]
    }]    
    #swagger.responses[200] = {
    description: 'Pedido pronto para ser retirado.'
    }
    #swagger.responses[404] = {
    description: 'Pedido não encontrado.'
    }
    #swagger.responses[400] = {
    description: 'Houve algum erro na requisição.'
    }
*/
        
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

