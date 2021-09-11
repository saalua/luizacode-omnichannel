const finalizarPedido = {
    pedidoNaoEncontrado: 'PEDIDO_NAO_ENCONTRADO',
    statusPedidoImpedeFinalizar: 'STATUS_PEDIDO_IMPEDE_FINALIZAR',
    finalizado: 'FINALIZADO'
}

const retirarPedido = {
    pedidoNaoEncontrado: 'PEDIDO_NAO_ENCONTRADO',
    statusPedidoImpedeRetirar: 'STATUS_PEDIDO_IMPEDE_RETIRAR',
    retirado: 'RETIRADO'
}

const statusPedido = {
    ANDAMENTO: 'ANDAMENTO',
    REALIZADO: 'REALIZADA',
    RETIRADO: 'RETIRADO'
}

class PedidoService {
    constructor(pedidoModel) {
        this.pedido = pedidoModel;
    }

    async getAllByIdCliente(idCliente) {
        const pedidos = await this.pedido.findAll({
            where: {
                idCliente
            }
        })
        return pedidos;
    }

    async getById(id) {
        const pedido = await this.pedido.findByPk(id);
        return pedido;
    }

    async retirarPedido(idPedido) {
        const pedidoEncontrado = await this.pedido.findByPk(idPedido)
        
        if (pedidoEncontrado == null) return retirarPedido.pedidoNaoEncontrado

        if (pedidoEncontrado.status !== statusPedido.REALIZADO) return retirarPedido.statusPedidoImpedeRetirar

        pedidoEncontrado.status = statusPedido.RETIRADO
        await pedidoEncontrado.save()
        return retirarPedido.retirado
    }

    async finalizarPedido(idPedido) {
        const pedidoEncontrado = await this.pedido.findByPk(idPedido);
        
        if (pedidoEncontrado == null) return finalizarPedido.pedidoNaoEncontrado;

        if (pedidoEncontrado.status !== statusPedido.ANDAMENTO) return finalizarPedido.statusPedidoImpedeFinalizar

        pedidoEncontrado.status = statusPedido.REALIZADO
        await pedidoEncontrado.save()
        return finalizarPedido.finalizado
    }
}

module.exports = { PedidoService, finalizarPedido, retirarPedido, statusPedido }