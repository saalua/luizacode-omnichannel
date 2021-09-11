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

}

module.exports = {ProdutosPedidosService} 