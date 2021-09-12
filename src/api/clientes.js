const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { cliente } = require('../models');
const {ClienteService} = require('../services/cliente');
const clienteService = new ClienteService(cliente);


router.post('/',

  body('nome')
    .notEmpty()
    .trim()
    .escape()
    .withMessage('O campo "nome" é obrigatótio'),
  body('endereco')
    .notEmpty()
    .trim()
    .escape()
    .withMessage('O campo "logradouro" é obrigatótio'),
  body('bairro')
    .notEmpty()
    .trim()
    .escape()
    .withMessage('O campo "bairro" é obrigatótio'),
  body('cidade')
    .notEmpty()
    .trim()
    .escape()
    .withMessage('O campo "cidade" é obrigatótio'),
  body('cep')
    .notEmpty()
    .matches(/\d{8}/)
    .withMessage('O campo "cep" deve conter 8 dígitos'),

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { nome, endereco, bairro, cidade, cep } = req.body

    try {
      await clienteService.create({ nome, endereco, bairro, cidade, cep })
      res.status(201).send({
        data: result
      })
    } catch(error){
      res.status(400).send(error.message)
    }

  })

  module.exports = router;























