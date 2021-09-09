const FINALIZAR_PEDIDO = {
    PEDIDO_NAO_ENCONTRADO: 'PEDIDO_NAO_ENCONTRADO',
    STATUS_PEDIDO_IMPEDE_FINALIZAR: 'STATUS_PEDIDO_IMPEDE_FINALIZAR',
    FINALIZADO: 'FINALIZADO'
}

const RETIRAR_PEDIDO = {
    PEDIDO_NAO_ENCONTRADO: 'PEDIDO_NAO_ENCONTRADO',
    STATUS_PEDIDO_IMPEDE_RETIRAR: 'STATUS_PEDIDO_IMPEDE_RETIRAR',
    RETIRADO: 'RETIRADO'
}

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

    async getById(id) {
        const pedido = await this.pedido.findByPk(id)
        return pedido
    }

    async retirarPedido(idPedido) {
        const pedidoEncontrado = await this.pedido.findByPk(idPedido)
        
        if (pedidoEncontrado == null) return RETIRAR_PEDIDO.PEDIDO_NAO_ENCONTRADO

        if (pedidoEncontrado.status !== 'REALIZADA') return RETIRAR_PEDIDO.STATUS_PEDIDO_IMPEDE_RETIRAR

        pedidoEncontrado.status = 'RETIRADO'
        await pedidoEncontrado.save()
        return RETIRAR_PEDIDO.RETIRADO
    }

    async finalizarPedido(idPedido) {
        const pedidoEncontrado = await this.pedido.findByPk(idPedido)
        
        if (pedidoEncontrado == null) return FINALIZAR_PEDIDO.PEDIDO_NAO_ENCONTRADO

        if (pedidoEncontrado.status !== 'ANDAMENTO') return FINALIZAR_PEDIDO.STATUS_PEDIDO_IMPEDE_FINALIZAR

        pedidoEncontrado.status = 'REALIZADA'
        await pedidoEncontrado.save()
        return FINALIZAR_PEDIDO.FINALIZADO
    }

}

module.exports = { PedidoService, FINALIZAR_PEDIDO, RETIRAR_PEDIDO }