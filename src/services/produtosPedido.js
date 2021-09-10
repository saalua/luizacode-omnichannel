class ProdutosPedidosService {
    constructor(produtosPedidoModel) {
        this.produtosPedido = produtosPedidoModel
    }

    async getProdutosPedidos() {
        const encontrados = await this.produtosPedido.findAll();
        return encontrados;
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