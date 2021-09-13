class ProdutosPedidosService {

    constructor(produtosPedidoModel) {
        this.model = produtosPedidoModel;
    }
 
    async delete(idPedido, idProduto){
        const result = await this.model.destroy({
            where: {
                ProdutoId: idProduto,
                PedidoId: idPedido
            }
        });
        return result;
    }

    async cadastrar(idPedido, idProduto){
        const produtoAdicionado = await this.model.create({
            ProdutoId: idProduto,
            PedidoId: idPedido
        });
        return produtoAdicionado;
    }

    async getByIdPedido(idPedido) {
        const result = await this.model.findAll({
            where: {
                PedidoId: idPedido
            }
        })
        return result;
    }

    
}

module.exports = {ProdutosPedidosService} 