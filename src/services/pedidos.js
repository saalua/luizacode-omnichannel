const { ProdutosPedidoService } = require("./produtosPedido");
const { produtosPedidos } = require('../models/produtosPedido')

const FINALIZAR_PEDIDO = {
    PEDIDO_NAO_ENCONTRADO: 'PEDIDO_NAO_ENCONTRADO',
    STATUS_PEDIDO_IMPEDE_FINALIZAR: 'STATUS_PEDIDO_IMPEDE_FINALIZAR',
    FINALIZADO: 'FINALIZADO'
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

    async finalizarPedido(idPedido) {
        const pedidoEncontrado = await this.pedido.findByPk(idPedido);
        
        if (pedidoEncontrado == null) return FINALIZAR_PEDIDO.PEDIDO_NAO_ENCONTRADO;

        if (pedidoEncontrado.status !== 'ANDAMENTO') return FINALIZAR_PEDIDO.STATUS_PEDIDO_IMPEDE_FINALIZAR;

        pedidoEncontrado.status = 'REALIZADO';
        await pedidoEncontrado.save();
        return FINALIZAR_PEDIDO.FINALIZADO;
    }
}

module.exports = { PedidoService, FINALIZAR_PEDIDO }