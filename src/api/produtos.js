const express = require('express');
const router = express.Router();

const { produto } = require('../models');
const ProdutoService = require('../services/produtos');

const produtoService = new ProdutoService(produto);

router.get('/', async (req, res) => {
  const produtos = await produtoService.get();
  res.status(200).json(produtos);
});


//add validacao id produto se e numerico
// se voltar null deve voltar 404 e msg tratada
router.get('/:id', async (req, res) => {
  const idProduto = req.params.id;
  const produto = await produtoService.getById(idProduto);
  res.status(200).json(produto);
});

module.exports = router;

