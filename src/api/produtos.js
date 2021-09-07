const express = require('express');
const router = express.Router()

const { produto } = require('../models');
const pedido = require('../models/pedido');
const ProdutoService = require('../services/produtos')
const {check, validationResult} = require('express-validator')

const produtoService = new ProdutoService(produto)

router.get('/', async (req, res) => {
  const produtos = await produtoService.get()
  res.status(200).json(produtos)
})

router.post('/pedidos/clientes', async (req, res) =>{
  const {idCLiente, idPedidos, idProdutos} = req.body
  try{
    await pedido.create({idCLiente, idPedidos, idProdutos})
    res.status(201).send('Cliente cadastrado com sucesso')
  } catch(erro){
    res.status(400).send('Não foi possivel cadastrar o cliente')
  }
});

module.exports = router

