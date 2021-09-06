class PedidoService {
    constructor(pedidoModel) {
        this.pedido = pedidoModel
    }

    async getAllByIdCliente(idCliente) {
        const pedidos = await this.pedido.findAll({
            where: {
                idCliente
            }
        })
        return pedidos
    }

}

module.exports = PedidoService