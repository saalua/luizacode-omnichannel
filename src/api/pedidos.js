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
        .withMessage('Para consultar um pedido é necessário informar o seu id, que precisa ser um valor numérico'),
    async (req, res) => {

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

  router.post('/:idPedido/finalizar',
    check('idPedido')
        .not().isEmpty()
        .matches(/\d/)
        .withMessage('Para finalizar um pedido é obrigatório informar o seu id, que precisa ser um valor numérico'),
    async (req, res) => {
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
            case finalizarPedido.statusPedidoImpedeFinalizar:
                res.status(400).json({ errors: [{ msg: 'Só é possível finalizar pedidos que estejam em andamento' }] })
                break
        }
    })

router.post('/:idPedido/retirar',
    check('idPedido')
        .not().isEmpty()
        .matches(/\d/)
        .withMessage('Para retirar um pedido é obrigatório informar o seu id, que precisa ser um valor numérico'),
    async (req, res) => {
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
                res.status(400).json({ errors: [{ msg: 'Só é possível retirar pedidos que estejam realizados e ainda não foram retirados' }] })
                break
        }
    });

    router.delete('/:idPedido/remover/:idProduto',
        check('idPedido')
        .not().isEmpty()
        .matches(/\d/)
        .withMessage('Para remover um item do pedido é necessário informar o id do pedido que é um número inteiro'),

        check('idProduto')
        .not().isEmpty()
        .matches(/\d/)
        .withMessage('Para remover um item do pedido é necessário informar o id do item que é um número inteiro'),

      async (req, res) => {
        
        const erros = validationResult(req);
        if(!erros.isEmpty()) {
          return res.status(400).json({erros: erros.array()});
        }

        try {
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
            }

        } catch(erro) {
            res.status(500).json({message: erro.message});
        }
    });

    router.post('/',
        check('idPedido')
            .not().isEmpty()
            .withMessage('idPedido do pedido obrigatório')
            .matches(/\d/)
            .withMessage('idPedido não é um número'),            
        check('produtos')
            .isArray()
            .withMessage('Campo "produtos" deve ser uma lista')
            .isLength({ min: 1 })
            .withMessage('Campo "produtos" deve ter no minímo 1 item'),            
        async (req, res) =>{

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
                res.status(201).send('Produto adicionado com sucesso!')
            } catch (e) {
                res.status(400).send(e.message);
            }        
    })

module.exports = router

