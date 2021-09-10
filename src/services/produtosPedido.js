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
}

module.exports = { ProdutosPedidosService }