const express = require('express');
const router = express.Router();
const { cliente } = require('../models');
const {ClienteService} = require('../services/cliente');
const clienteService = new ClienteService(cliente);

router.post('/', async (req, res) =>{
  const cliente = req.body
  try {
    const result = await clienteService.create(cliente);
    res.status(201).send({
      data: result
    });
  } catch(e){
    res.status(400).send({
      errors: [{msg:'Não foi possivel cadastrar o cliente'}]
    });
  }
});

module.exports = router
