const express = require('express');
const router = express.Router();

const { produto } = require('../models');
const ProdutoService = require('../services/produtos');

const produtoService = new ProdutoService(produto);

router.get('/', async (req, res) => {
  const produtos = await produtoService.get();
  res.status(200).json(produtos);
});

router.get('/:id', async (req, res) => {
  const idProduto = req.params.id;
  const produto = await produtoService.getProdutoById(idProduto);
  res.status(200).json(produto);
});

module.exports = router;

