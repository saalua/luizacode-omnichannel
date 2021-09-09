const express = require('express');
const router = express.Router()

const { loja } = require('../models')
const LojaService = require('../services/lojas')

const lojaService = new LojaService(loja)

router.get('/', async (req, res) => {
  const lojas = await lojaService.get()
  res.status(201).json(lojas)
})

module.exports = router