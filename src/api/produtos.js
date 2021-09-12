const express = require('express');
const router = express.Router();

const { produto } = require('../models');
const ProdutoService = require('../services/produtos');

const produtoService = new ProdutoService(produto);

router.get('/', async (req, res) => {
  const produtos = await produtoService.get();
  res.status(200).json(produtos);
});

router.get('/:idProduto', 

  async (req, res) => {

  const idProduto = req.params.idProduto;
  
  const validacaoPedido = await validaProduto(idProduto);
    
  if (!validacaoPedido.isValid) {
      return res.status(400).json({ errors: validacaoPedido.errors })
        
  }
  
  const produto = await produtoService.getById(idProduto);

  return res.status(200).json({
    data: produto
  });

}); 

module.exports = router;

async function validaProduto(idProduto) {

  const result = {
      isValid: true,
      errors: [],
      data: null
  }

  if (isNaN(idProduto)) {
      result.isValid = false;
      result.errors = [{param: "idProduto", "location": "path", msg: "idProduto deve ser númerico (" + idProduto + ")"}];
      return result;
  } 

  const produto = await produtoService.getById(idProduto);
  result.data = produto;

  if (produto == null) {
      result.isValid = false;
      result.errors = [{param: "idProduto", "location": "path", msg: "Produto não encontrado (" + idProduto + ")"}];
      return result;
  }

  return result; 
}

