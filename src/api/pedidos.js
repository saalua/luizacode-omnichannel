const { request, response } = require('express');
const express = require('express');
const router = express.Router()
const { check, validationResult } = require('express-validator');

const { pedido, produtosPedido, produto } = require('../models');
const { PedidoService, finalizarPedido, retirarPedido } = require('../services/pedidos');
const ProdutoService = require('../services/produtos');
const { ProdutosPedidosService, removerProduto } = require('../services/produtosPedido');

const pedidoService = new PedidoService(pedido);
const produtoService = new ProdutoService(produto);
const produtosPedidosService = new ProdutosPedidosService(produtosPedido);


  router.get('/:idPedido',
    check('idPedido')
        .not().isEmpty()
        .matches(/\d/)
        .withMessage('Para consultar um pedido é necessário informar o seu id, que precisa ser um valor numérico.'),
    async (req, res) => {

/*
    #swagger.tags = ['Pedidos']
    #swagger.description = 'Endpoint para a consulta de pedidos do cliente por ID.' 
    #swagger.responses[200] = {
    description: 'Consulta realizada com sucesso.'
    }
    #swagger.responses[404] = {
    description: 'Pedido não encontrado.'
    }
    #swagger.responses[400] = {
    description: 'Houve algum erro na requisição.'
    }
*/

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { idPedido } = req.params
        const pedidoEncontrado = await pedidoService.getById(idPedido)
        if (pedidoEncontrado == null) {
            res.status(404).send()
        } else {
            res.status(200).json(pedidoEncontrado)
        }
    });

  router.get('/',
    check('idCliente')
        .not().isEmpty()
        .matches(/\d/)
        .withMessage('Para consultar os pedidos é obrigatório informar o parâmetro idCliente que precisa ser um valor numérico.'),
    async (req, res) => {

/*
    #swagger.tags = ['Pedidos']
    #swagger.description = 'Endpoint para a consulta de todos os pedidos do cliente.' 
    #swagger.responses[200] = {
    description: 'Consulta realizada com sucesso.'
    }
    #swagger.responses[404] = {
    description: 'Pedidos não encontrados.'
    }
    #swagger.responses[400] = {
    description: 'Houve algum erro na requisição.'
    }
*/

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { idCliente } = req.query
        const pedidos = await pedidoService.getAllByIdCliente(idCliente)
        res.status(200).json(pedidos)
    })

  router.post('/:idPedido/finalizar',
    check('idPedido')
        .not().isEmpty()
        .matches(/\d/)
        .withMessage('Para finalizar um pedido é obrigatório informar o seu id, que precisa ser um valor numérico.'),
    async (req, res) => {

/*
    #swagger.tags = ['Pedidos']
    #swagger.description = 'Endpoint para finalizar o pedido do cliente.' 
    #swagger.responses[200] = {
    description: 'Pedido finalizado.'
    }
    #swagger.responses[404] = {
    description: 'Pedido não encontrado.'
    }
    #swagger.responses[400] = {
    description: 'Só é possível finalizar pedidos que estejam em andamento.'
    }
*/

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { idPedido } = req.params
        const resultado = await pedidoService.finalizarPedido(idPedido)
        switch (resultado) {
            case finalizarPedido.finalizado:
                res.status(200).send()
                break
            case finalizarPedido.pedidoNaoEncontrado:
                res.status(404).send()
                break
<<<<<<< HEAD
            case finalizarPedido.statusPedidoImpedeFinalizar:
                res.status(400).json({ errors: [{ msg: 'Só é possível finalizar pedidos que estejam em andamento' }] })
=======
            case FINALIZAR_PEDIDO.STATUS_PEDIDO_IMPEDE_FINALIZAR:
                res.status(400).json({ errors: [{ msg: 'Só é possível finalizar pedidos que estejam em andamento.' }] })
>>>>>>> fee370cac8dee4dfe26acc03b58a12928ecf5a1b
                break
        }
    })

router.post('/:idPedido/retirar',
    check('idPedido')
        .not().isEmpty()
        .matches(/\d/)
        .withMessage('Para retirar um pedido é obrigatório informar o seu id, que precisa ser um valor numérico.'),
    async (req, res) => {

/*
    #swagger.tags = ['Pedidos']
    #swagger.description = 'Endpoint para retirar o pedido do cliente.' 
    #swagger.responses[200] = {
    description: 'Pedido pronto para ser retirado.'
    }
    #swagger.responses[404] = {
    description: 'Pedido não encontrado.'
    }
    #swagger.responses[400] = {
    description: 'Só é possível retirar pedidos que estejam realizados e ainda não foram retirados.'
    }
*/

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        
        const { idPedido } = req.params
        const resultado = await pedidoService.retirarPedido(idPedido)
        switch (resultado) {
            case retirarPedido.retirado:
                res.status(200).send()
                break
            case retirarPedido.pedidoNaoEncontrado:
                res.status(404).send()
                break
            case retirarPedido.statusPedidoImpedeRetirar:
                res.status(400).json({ errors: [{ msg: 'Só é possível retirar pedidos que estejam realizados e ainda não foram retirados.' }] })
                break
        }
    });

    router.delete('/:idPedido/remover/:idProduto',
        check('idPedido')
        .not().isEmpty()
        .matches(/\d/)
        .withMessage('Para remover um item do pedido é necessário informar o id do pedido que é um número inteiro.'),

        check('idProduto')
        .not().isEmpty()
        .matches(/\d/)
        .withMessage('Para remover um item do pedido é necessário informar o id do item que é um número inteiro.'),

      async (req, res) => {

/*
    #swagger.tags = ['Pedidos']
    #swagger.description = 'Endpoint para remover um pedido.' 
    #swagger.responses[200] = {
    description: 'Pedido cancelado com sucesso.'
    }
    #swagger.responses[404] = {
    description: 'Pedido não encontrado.'
    }
    #swagger.responses[400] = {
    description: 'Não é possível alterar o pedido quando o status se encontra como REALIZADA ou RETIRADO.'
    }
*/

const erros = validationResult(req);
        if(!erros.isEmpty()) {
          return res.status(400).json({erros: erros.array()});
        }

        try {
<<<<<<< HEAD
            const { idPedido, idProduto } = req.params;
            const resposta = await produtosPedidosService.removerProduto(idPedido, idProduto)
            switch(resposta) {
                case removerProduto.pedidoProdutoNaoEncontrado:
                    res.status(404).send();
                    break;
                case removerProduto.statusNaoPermiteRemoverProduto:
                    res.status(400).json("Não é possível alterar o pedido quando o status se encontra como REALIZADA ou RETIRADO");
                    break;
                case removerProduto.produtoRemovido:
                    res.status(200).json("Produto removido com sucesso");
                    break;
=======
            const pedido = req.params.idPedido;
            const produto = req = req.params.idProduto;

            const pedidoEncontrado = await pedidoService.getById(pedido);
            const produtoEncontrado = await produtoService.getProdutoById(produto);

            if(pedidoEncontrado.status == 'ANDAMENTO') {
                await produtosPedidosService.removerProduto(pedido, produto);
                res.status(200).json({"Produto removido com sucesso": {"pedido": pedidoEncontrado, "produto": produtoEncontrado}});
            } else {
                res.status(400).json("Não é possível alterar o pedido quando o status se encontra como REALIZADA ou RETIRADO.");
>>>>>>> fee370cac8dee4dfe26acc03b58a12928ecf5a1b
            }

        } catch(erro) {
            res.status(500).json({message: erro.message});
        }
    });

    router.post('/',
        check('idPedido')
            .not().isEmpty()
            .withMessage('idPedido do pedido obrigatório.')
            .matches(/\d/)
            .withMessage('idPedido não é um número.'),            
        check('produtos')
            .isArray()
            .withMessage('Campo "produtos" deve ser uma lista.')
            .isLength({ min: 1 })
            .withMessage('Campo "produtos" deve ter no minímo 1 item.'),            
        async (req, res) =>{

/*
    #swagger.tags = ['Pedidos']
    #swagger.description = 'Endpoint para se realizar um pedido.' 
    #swagger.responses[201] = {
    description: 'Produto adicionado com sucesso.'
    }
    #swagger.responses[404] = {
    description: 'Pedido não encontrado.'
    }
    #swagger.responses[400] = {
    description: 'Houve algum erro na requisição.'
    }
*/

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }    
        
            try {
                const { idPedido, produtos} = req.body
                const pedido = await pedidoService.getById(idPedido);
    
                for(let i = 0; i < produtos.length; i++) {
                    idProduto = produtos[i];
                    const produto = await produtoService.getProdutoById(idProduto); 
                    pedido.addProduto(produto);
                };    
                res.status(201).send('Produto adicionado com sucesso.')
            } catch (e) {
                res.status(400).send(e.message);
            }        
    })

module.exports = router

