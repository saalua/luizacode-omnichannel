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

const STATUS = {
    ANDAMENTO: 'ANDAMENTO',
    REALIZADO: 'REALIZADA',
    RETIRADO: 'RETIRADO'
}

class PedidoService {
    constructor(pedidoModel) {
        this.model = pedidoModel;
    }

    async get() {
        return await this.model.findAll();
    }

    async getAllByIdCliente(idCliente) {
        const pedidos = await this.model.findAll({
            where: {
                idCliente
            }
        })
        return pedidos;
    }

    async getByIdClienteAndIdPedido(idCliente, idPedido) {
        const pedidos = await this.model.findOne({
            where: {
                idCliente,
                id: idPedido
            }
        })
        return pedidos;
    }

    async getById(id) {
        const pedido = await this.model.findByPk(id);
        return pedido;
    }

    async create(pedido) {
        const {idCliente} = pedido;
        return await this.model.create({status: STATUS.ANDAMENTO, idCliente});
    }

    async retirarPedido(idPedido) {
        const pedidoEncontrado = await this.model.findByPk(idPedido)
        
        if (pedidoEncontrado == null) return RETIRAR_PEDIDO.PEDIDO_NAO_ENCONTRADO

        if (pedidoEncontrado.status !== STATUS.REALIZADO) return RETIRAR_PEDIDO.STATUS_PEDIDO_IMPEDE_RETIRAR

        pedidoEncontrado.status = STATUS.RETIRADO
        await pedidoEncontrado.save()
        return RETIRAR_PEDIDO.RETIRADO
    }

    async finalizarPedido(idPedido) {
        const pedidoEncontrado = await this.model.findByPk(idPedido);
        
        if (pedidoEncontrado == null) return FINALIZAR_PEDIDO.PEDIDO_NAO_ENCONTRADO;

        if (pedidoEncontrado.status !== STATUS.ANDAMENTO) return FINALIZAR_PEDIDO.STATUS_PEDIDO_IMPEDE_FINALIZAR

        pedidoEncontrado.status = STATUS.REALIZADO
        await pedidoEncontrado.save()
        return FINALIZAR_PEDIDO.FINALIZADO
    }
}

module.exports = { PedidoService, FINALIZAR_PEDIDO, RETIRAR_PEDIDO, STATUS }