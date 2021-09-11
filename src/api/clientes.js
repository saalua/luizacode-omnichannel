const express = require('express');
const router = express.Router();
const { cliente } = require('../models');

router.post('/', async (req, res) =>{

/*
    #swagger.tags = ['Clientes']
    #swagger.description = 'Endpoint para o cadastro do cliente.' 
    #swagger.responses[201] = {
    schema: { $ref: "#/definitions/Clientes"},
    description: 'Cliente cadastrado com sucesso.'
    }
    #swagger.responses[400] = {
    description: 'Não foi possivel cadastrar o cliente.'
    }
*/

  const {nome, logradouro, bairro, cidade, cep, email, senha} = req.body
  try{
    await cliente.create({nome, logradouro, bairro, cidade, cep, email, senha})
    res.status(201).send('Cliente cadastrado com sucesso.')
  } catch(erro){
    res.status(400).send('Não foi possivel cadastrar o cliente.')
  }
});

module.exports = router
