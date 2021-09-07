const express = require('express');
const router = express.Router()

const { produto } = require('../models')
const ProdutoService = require('../services/produtos')

const produtoService = new ProdutoService(produto)

router.get('/', async (req, res) => {

/*
    #swagger.tags = ['Produtos']
    #swagger.description = 'Endpoints para se obter uma lista de produtos.' 
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

module.exports = router