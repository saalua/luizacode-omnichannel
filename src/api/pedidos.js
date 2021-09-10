const express = require('express');
const router = express.Router()
const { check, validationResult } = require('express-validator');
const { restart } = require('nodemon');

const { pedido, produtosPedido } = require('../models');
const { PedidoService, FINALIZAR_PEDIDO } = require('../services/pedidos');
const { ProdutosPedidosService } = require('../services/produtosPedido');

const pedidoService = new PedidoService(pedido);
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
    })

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
            case FINALIZAR_PEDIDO.FINALIZADO:
                res.status(200).send()
                break
            case FINALIZAR_PEDIDO.PEDIDO_NAO_ENCONTRADO:
                res.status(404).send()
                break
            case FINALIZAR_PEDIDO.STATUS_PEDIDO_IMPEDE_FINALIZAR:
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
            case RETIRAR_PEDIDO.RETIRADO:
                res.status(200).send()
                break
            case RETIRAR_PEDIDO.PEDIDO_NAO_ENCONTRADO:
                res.status(404).send()
                break
            case RETIRAR_PEDIDO.STATUS_PEDIDO_IMPEDE_RETIRAR:
                res.status(400).json({ errors: [{ msg: 'Só é possível retirar pedidos que estejam realizados e ainda não foram retirados' }] })
                break
        }
    })


    /* não pode remover se o produto ja estiver finalizado e retirado*/
    router.delete('/:idPedido/remover/:idProduto', 
      async (req, res) => {
        
        const erros = validationResult(req)
        if(!erros.isEmpty()) {
          return res.status(400).json({erros: erros.array()})
        }

        try {
          const { pedido, produto } = req.params
          const produtoRemovido = await produtosPedidosService.removerProduto(pedido, produto)
          
          res.status(200).json({"produto removido com sucesso": produtoRemovido})
        } catch(erro) {
          res.json({message: erro.message})
        }
      });


    router.post('/', async (req, res) =>{
        const {idCliente, idProdutos, id_loja} = req.body;

        /** o request body vai ser um array com vários id de produto, 
         * 
         * cadastrar: tem que percorrer o array dando create na tabela de produtospedidos passando o id do pedido e id do produto
         * Regra: verificar se os produtos tem o mesmo id 
         */
        try{
          await pedido.create({
              idCliente, 
              idLoja: id_loja,
              idProdutos,
              status: "REALIZADA",
              total: 0
            })
          res.status(201).send('Cliente cadastrado com sucesso')
        } catch(erro){
            console.log(erro);
          res.status(400).send('Não foi possivel cadastrar o cliente')
        }
      });

      //adicionar o id pedido no array
      
module.exports = router