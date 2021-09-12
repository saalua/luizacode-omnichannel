require('dotenv').config();

const express = require('express');
const md5 = require('md5');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const { cliente } = require('../models');
const ClienteService = require('../services/clientes');
const clienteService = new ClienteService(cliente);

const jwt = require('jsonwebtoken');
const JWTSecret = process.env.JWTSecret;

router.post(
  '/',
  body('nome')
    .notEmpty()
    .trim()
    .escape()
    .withMessage('O campo "nome" é obrigatótio'),
  body('logradouro')
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
  body('email')
    .normalizeEmail()
    .isEmail()
    .withMessage('O campo "email" é obrigatótio'),
  body('senha')
    .notEmpty()
    .trim()
    .escape()
    .isLength({ min: 6 })
    .withMessage('O campo "senha" deve conter ao menos 6 caracteres'),
  async (req, res) => {
    /*
			#swagger.tags = ['Clientes']
			#swagger.description = 'Endpoint para o cadastro do cliente.' 
			#swagger.responses[201] = {
			schema: { $ref: "#/definitions/Clientes"},
			description: 'Cliente cadastrado com sucesso.'
			}
			#swagger.responses[400] = {
			description: 'Houve algum erro na requisição.'
			}
		*/
    const erros = validationResult(req);

    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }

    const { nome, logradouro, bairro, cidade, cep, email, senha } = req.body;

    try {
      await clienteService.createUser(
        nome,
        logradouro,
        bairro,
        cidade,
        cep,
        email,
        md5(senha)
      );
      res.status(201).send('Cliente cadastrado com sucesso');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

router.post(
  '/login',
  body('email')
    .normalizeEmail()
    .isEmail()
    .withMessage('O campo "email" é obrigatótio'),
  body('senha')
    .notEmpty()
    .trim()
    .escape()
    .isLength({ min: 6 })
    .withMessage('O campo "senha" deve conter ao menos 6 caracteres'),
  async (req, res) => {

/*
    #swagger.tags = ['Clientes']
    #swagger.description = 'Endpoint para o login do usuário, disponibilizando o token de acesso aos recursos de pedido.' 
    #swagger.responses[200] = {
      description: 'Login feito com sucesso.',
    }
    #swagger.responses[400] = {
      description: 'Houve algum erro na requisição.'
    }
    #swagger.responses[401] = {
      description: 'Unauthorized.'
    }
    #swagger.responses[404] = {
      description: 'Usuário não cadastrado.'
    }
*/

    const erros = validationResult(req);

    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }

    const { email, senha } = req.body;

    const findCliente = await clienteService.getByEmail(email);

    if (findCliente) {
      if (findCliente.senha == md5(senha)) {
        jwt.sign(
          { id: findCliente.id, email: findCliente.email },
          JWTSecret,
          { expiresIn: '48h' },
          (err, token) => {
            if (err) {
              res.status(400).json('Houve alguma falha interna!');
            } else {
              res.status(200).json({ token: token });
            }
          }
        );
      } else {
        res.status(401).send('Credenciais invalidas!');
      }
    } else {
      res.status(404).send('Email nao cadastrado no banco!');
    }
  }
);

module.exports = router;
