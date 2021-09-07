const express = require('express');
const router = express.Router()

const { loja } = require('../models')
const LojaService = require('../services/lojas')

const lojaService = new LojaService(loja)

router.get('/', async (req, res) => {

/*
    #swagger.tags = ['Lojas']
    #swagger.description = 'Endpoints para se obter a lista das lojas.' 
    #swagger.responses[200] = {
      schema: { $ref: "#/definitions/Lojas"},
      description: 'Lista de lojas encontrada.'
    }
    #swagger.responses[404] = {
      description: 'Lista de lojas não encontrada.'
    }
    #swagger.responses[400] = {
      description: 'Houve algum erro na requisição.'
    }
*/

  const lojas = await lojaService.get()
  res.status(201).json(lojas)
})

module.exports = router