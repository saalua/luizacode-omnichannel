const express = require('express');
const router = express.Router();
const { cliente } = require('../models');

router.post('/', async (req, res) =>{
  const {nome, endereco, bairro, cidade, cep} = req.body
  try{
    await cliente.create({nome, endereco, bairro, cidade, cep})
    res.status(201).send('Cliente cadastrado com sucesso')
  } catch(erro){
    res.status(400).send('Não foi possivel cadastrar o cliente')
  }
});

module.exports = router
