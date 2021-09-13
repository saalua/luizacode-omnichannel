const express = require('express');
const router = express.Router()

const { loja } = require('../models')
const LojaService = require('../services/lojas')

const lojaService = new LojaService(loja)

router.get('/', async (req, res) => {


  /*

    #swagger.tags = ['Lojas']
    #swagger.description = 'Endpoint para se obter a lista das lojas.' 
    #swagger.responses[200] = {
      schema: { $ref: "#/definitions/Lojas"},
      description: 'Lista de lojas encontrada.'
    }
 
*/

  const lojas = await lojaService.get()
  res.status(200).json({
    data: lojas
  });
});
 

module.exports = router