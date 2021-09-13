const { request, response } = require('express');
const express = require('express');
const router = express.Router()
const { check, validationResult } = require('express-validator');

const { pedido, produtosPedido, produto, cliente, loja } = require('../models');
const { PedidoService, FINALIZAR_PEDIDO } = require('../services/pedidos');
const ProdutoService = require('../services/produtos');
const LojaService = require('../services/lojas');
const { ProdutosPedidosService } = require('../services/produtosPedido');
const { ClienteService } = require('../services/cliente');

const pedidoService = new PedidoService(pedido);
const produtoService = new ProdutoService(produto);
const produtosPedidosService = new ProdutosPedidosService(produtosPedido);
const clienteService = new ClienteService(cliente);
const lojaService = new LojaService(loja);

router.get('/:idCliente/pedidos',
    async (req, res) => {

         /*
			#swagger.tags = ['Pedidos']
			#swagger.description = 'Endpoint para o obter os pedidos do cliente.' 
			#swagger.responses[200] = {
			description: 'Pedidos do cliente localizados com sucesso.'
			}
			#swagger.responses[400] = {
			description: 'Houve algum erro na requisição.'
			}
		*/

        const idCliente = req.params.idCliente;

        const validacao = await validaCliente(idCliente);
    
        if (!validacao.isValid) {
            return res.status(400).json({ errors: validacao.errors })
        }

        const result = await pedidoService.getAllByIdCliente(idCliente);

        return res.status(200).json({
            data: result
        });
    });   

router.get('/:idCliente/pedidos/:idPedido',
    async (req, res) => {

         /*
			#swagger.tags = ['Pedidos']
			#swagger.description = 'Endpoint para o retonrar um pedido do cliente pelo ID.' 
			#swagger.responses[200] = {
			description: 'Pedido do cliente localizado com sucesso.'
			}
			#swagger.responses[400] = {
			description: 'Houve algum erro na requisição.'
			}
            #swagger.responses[404] = {
			description: 'Pedido não encontrado.'
			}
		*/

        const idCliente = req.params.idCliente;
        const idPedido = req.params.idPedido;

        const validacao = await validaCliente(idCliente);
        const validacaoPedido = await validaIdPedido(idPedido);
    
        if (!validacao.isValid || !validacaoPedido.isValid) {
            const errors = validacao.errors.concat(validacaoPedido.errors);
            return res.status(400).json({ errors })
        }

        const result = await pedidoService.getByIdClienteAndIdPedido(idCliente, idPedido);
        const produtos = [];

        const produtosPedidoDB = await produtosPedidosService.getByIdPedido(idPedido);
        
        for(let i = 0; i < produtosPedidoDB.length; i++) {
            const produtoId = produtosPedidoDB[i].ProdutoId;
            const produto = await produtoService.getById(produtoId); 
            produtos.push(produto);     
        }; 


        if (result == null) {
            return res.status(404).json();
        }

        return res.status(200).json({
            data: {
                id: result.id,
                idLoja: result.idLoja,
                idCliente: result.idCliente,
                status: result.status,
                produtos: produtos
            }
        });

    });

    //adicionar o produto
router.post('/:idCliente/pedidos',
    async (req, res) => {

        /*
			#swagger.tags = ['Pedidos']
			#swagger.description = 'Endpoint para cadastrar um pedido do cliente.' 
			#swagger.responses[200] = {
			description: 'Pedido do cadastrado com sucesso.'
			}
			#swagger.responses[400] = {
			description: 'Houve algum erro na requisição.'
			}
        
		*/
            console.log("1")
    const idCliente = req.params.idCliente;

    const validacao = await validaCliente(idCliente);
    console.log("1")
    if (!validacao.isValid) {
        return res.status(400).json({ errors: validacao.errors })
    }
    console.log("1")
    try {
        const cliente = validacao.data;
        const result = await pedidoService.create({idCliente});
        return res.status(200).json({
            data: result
        });   
    } catch (err) {
        return res.status(500).json({
            data: err
        }); 
    }

});

router.put('/:idCliente/pedidos/:idPedido',
        check('idLoja')
            .isNumeric()
            .withMessage('Campo "idLoja" deve sernumerico'),
        check('produtos')
            .isArray()
            .withMessage('Campo "produtos" deve ser uma lista')
            .isLength({ min: 0 })
            .withMessage('Campo "produtos" deve ter no minímo 1 item'),

    async (req, res) => {

         /*
			#swagger.tags = ['Pedidos']
			#swagger.description = 'Endpoint para adicionar um produto na lista de compra do cliente.' 
			#swagger.responses[200] = {
			description: 'Pedido adicionado com sucesso.'
			}
			#swagger.responses[400] = {
			description: 'Não e permitido cadastrar mais de um produto da mesma categoria.'
			}
            #swagger.responses[404] = {
			description: 'Houve um erro na requisição.'
			}
        
		*/


        const idCliente = req.params.idCliente;
        const idPedido = req.params.idPedido;
        const produtos = req.body.produtos;
        const idLoja = req.body.idLoja;

        const validacao = await validaCliente(idCliente);
        const validacaoPedido = await validaIdPedido(idPedido);
        const validacaoLoja = await validaIdLoja(idLoja);
        const validaBody = validationResult(req);
             
        if (!validacao.isValid || !validacaoPedido.isValid || !validacaoLoja.isValid || !validaBody.isEmpty()) {
            const errors = validacao.errors
                .concat(validaBody.array())
                .concat(validacaoPedido.errors)
                .concat(validacaoLoja.errors);
            return res.status(400).json({ errors })
        }

        const pedidoDB = await pedidoService.getByIdClienteAndIdPedido(idCliente, idPedido);

        if (pedidoDB == null) {
            return res.status(404).json();
        }

        const produtosDB = [];
        const categorias = [];

        for(let i = 0; i < produtos.length; i++) {
            const produto = await produtoService.getById(produtos[i]); 
            produtosDB.push(produto);
            categorias.push(produto.categoria);
        }; 

        const categoriasUnique = Array.from(new Set(categorias));

        if(categoriasUnique.length != categorias.length) {
            res.status(400).json({
                errors: [{msg:'Não e permitido cadastrar mais de um produto da mesma categoria'}]
            });
        }

        const produtosPedidoDB = await produtosPedidosService.getByIdPedido(idPedido);

        for(let i = 0; i < produtosPedidoDB.length; i++) {
            const pedidoId = produtosPedidoDB[i].PedidoId;
            const produtoId = produtosPedidoDB[i].ProdutoId;
            const listaProdutosEnviados = produtos.filter(id => id == produtoId);

            if (listaProdutosEnviados.length == 0) {
                await produtosPedidosService.delete(pedidoId, produtoId);
            }           
        }; 

        for(let i = 0; i < produtosDB.length; i++) {
            const produto = produtosDB[i]; 
            try {
                await pedidoDB.addProduto(produto);
            } catch (e) {
                console.log(e)
            }
            
        }; 
        
        pedidoDB.idLoja = idLoja;
        await pedidoDB.save();

        return res.status(200).json({
            data: {
                pedidoDB
            }
        });      
    
});

router.patch('/:idCliente/pedidos/:idPedido/finalizar',
    async (req, res) => {

         /*
			#swagger.tags = ['Pedidos']
			#swagger.description = 'Endpoint para finalizar a compra do cliente.' 
			#swagger.responses[200] = {
			description: 'Pedido finalizado com sucesso.'
			}
			#swagger.responses[400] = {
			description: 'Não é possível finalizar se o pedido está em andamento.'
			}
            #swagger.responses[404] = {
			description: 'Houve um erro na requisição.'
			}
        
		*/


        const idCliente = req.params.idCliente;
        const idPedido = req.params.idPedido;

        const validacao = await validaCliente(idCliente);
        const validacaoPedido = await validaIdPedido(idPedido);
    
        if (!validacao.isValid || !validacaoPedido.isValid) {
            const errors = validacao.errors.concat(validacaoPedido.errors);
            return res.status(400).json({ errors })
        }

        const resultPedido = await pedidoService.getByIdClienteAndIdPedido(idCliente, idPedido);

        if (resultPedido == null) {
            return res.status(404).json();
        }

        const resultUpdatePedido = await pedidoService.finalizarPedido(idPedido);

        if (resultUpdatePedido != "FINALIZADO") {
            return res.status(400).json({errors: [{msg: resultUpdatePedido}]});
        }

        return res.status(200).json({data: resultUpdatePedido});
    });

module.exports = router


async function validaCliente(idCliente) {

    const result = {
        isValid: true,
        errors: [],
        data: null
    }

    if (isNaN(idCliente)) {
        result.isValid = false;
        result.errors = [{param: "idCliente", "location": "path", msg: "idCliente deve ser numerico (" + idCliente + ")"}];
        return result;
    } 

    const cliente = await clienteService.getById(idCliente);
    result.data = cliente;

    if (cliente == null) {
        result.isValid = false;
        result.errors = [{param: "idCliente", "location": "path", msg: "Cliente nao encontrado (" + idCliente + ")"}];
        return result;
    }

    return result; 
}


async function validaIdLoja(idLoja) {

    const result = {
        isValid: true,
        errors: [],
        data: null
    }

    if (isNaN(idLoja)) {
        result.isValid = false;
        return result;
    } 

    const loja = await lojaService.getById(idLoja);
    result.data = loja;

    if (loja == null) {
        result.isValid = false;
        result.errors = [{param: "idLoja", "location": "body", msg: "Loja nao encontrado (" + idLoja + ")"}];
        return result;
    }

    return result; 
}


async function validaIdPedido(idPedido) {

    const result = {
        isValid: true,
        errors: [],
        data: null
    }

    if (isNaN(idPedido)) {
        result.isValid = false;
        result.errors = [{param: "idPedido", "location": "path", msg:"idPedido deve ser numerico (" + idPedido + ")"}];
        return result;
    } 

    return result; 
}