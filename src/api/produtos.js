const express = require('express');
const router = express.Router();

const { produto } = require('../models');
const ProdutoService = require('../services/produtos');
const { check, validationResult } = require('express-validator');

const produtoService = new ProdutoService(produto);

router.get('/', async (req, res) => {
  const produtos = await produtoService.get();
  res.status(200).json(produtos);
});

router.get('/:id',
    check('id')
        .not().isEmpty()
        .matches(/\d/)
        .withMessage('Para consultar um produto é preciso informar seu id, que precisa ser um valor numérico'),
    async (req, res) => {
        
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        
        const idProduto = req.params.id;
        const produto = await produtoService.getProdutoById(idProduto);
        
        if(produto == null) {
            res.status(404).json("Produto não encontrado")
        } else {
            res.status(200).json(produto);
        }
});

module.exports = router;

