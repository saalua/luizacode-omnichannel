const express = require('express');
const router = express.Router();

const { produto } = require('../models');
const ProdutoService = require('../services/produtos');
const { check, validationResult } = require('express-validator');

const produtoService = new ProdutoService(produto);

router.get('/', async (req, res) => {

/*
    #swagger.tags = ['Produtos']
    #swagger.description = 'Endpoint para se obter uma lista de produtos.' 
    #swagger.responses[200] = {
      description: 'Lista de produtos encontrada.',
      schema: { $ref: "#/definitions/Produtos"}
    }
    #swagger.responses[404] = {
      description: 'Lista de produtos não encontrada.'
    }
    #swagger.responses[400] = {
      description: 'Houve algum erro na requisição.'
    }
*/

  const produtos = await produtoService.get()
  res.status(200).json(produtos)
})

router.get('/:id',
    check('id')
        .not().isEmpty()
        .matches(/\d/)
        .withMessage('Para consultar um produto é preciso informar seu id, que precisa ser um valor numérico'),
    async (req, res) => {
        
/*
    #swagger.tags = ['Produtos']
    #swagger.description = 'Endpoint para acessar um produto pelo seu ID.' 
    #swagger.responses[200] = {
      description: 'Produto encontrado.',
    }
    #swagger.responses[404] = {
      description: 'Produto não encontrado.'
    }
    #swagger.responses[400] = {
      description: 'Houve algum erro na requisição.'
    }
*/

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

