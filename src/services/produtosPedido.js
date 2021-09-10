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

    // * cadastrar: tem que percorrer o array dando create na tabela de produtospedidos passando o id do pedido e id do produto
        //  * Regra: verificar se os produtos tem o mesmo id 
    async store ({idProduto, idPedido}){
        //verifica se ja existe produto com o mesmo id
        const produto = await this.produtosPedido.findOne({
            where:{
                idPedido,
                idProduto,
            }
        })
        if(produto != null){
            throw new Error('Já existe um produto cadastrado com esse nome!')
        }
        try{
            await this.produto.create(idProduto, idPedido)
        } catch(erro){
            console.erro(erro.message)
            throw erro
        }

    }

}

module.exports = {ProdutosPedidosService} 