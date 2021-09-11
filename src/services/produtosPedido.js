const { pedido, produto } = require('../models');
const { PedidoService } = require('../services/pedidos');
const ProdutoService = require('../services/produtos');
const pedidoService = new PedidoService(pedido);
const produtoService = new ProdutoService(produto);

const removerProduto = {
    pedidoProdutoNaoEncontrado: 'PEDIDO_PRODUTO_NAO_ENCONTRADO',
    statusNaoPermiteRemoverProduto: 'STATUS_NAO_PERMITE_REMOVER_PRODUTO',
    produtoRemovido: 'PRODUTO_REMOVIDO'
}

class ProdutosPedidosService {
    constructor(produtosPedidoModel) {
        this.produtosPedido = produtosPedidoModel
    }
 
    async removerProduto(idPedido, idProduto) {
        console.log(idPedido, idProduto)
        const produtoRemovido = await this.produtosPedido.destroy({
            where: {
                idPedido,
                idProduto
            }
        });
            
        return produtoRemovido;
    }

    async adicionar(idPedido, idProduto){
        const produtoAdicionado = await this.produtosPedido.create({
            idProduto: idProduto,
            idPedido: idPedido
        });
        return produtoAdicionado;
    }
    async removerProduto(idPedido, idProduto) {

        const pedidoEncontrado = await pedidoService.getById(idPedido);
        const produtoEncontrado = await produtoService.getProdutoById(idProduto);
        if(pedidoEncontrado == null || produtoEncontrado == null) {
            return removerProduto.pedidoProdutoNaoEncontrado
        }

        if(pedidoEncontrado.status !== 'ANDAMENTO') {
            return removerProduto.statusNaoPermiteRemoverProduto
        }

        await this.produtosPedido.destroy({
            where: {
                idPedido,
                idProduto
            }
        });

        return removerProduto.produtoRemovido
    }
}

module.exports = {ProdutosPedidosService, removerProduto} 