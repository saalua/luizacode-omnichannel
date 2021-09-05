class PedidoService {
    constructor (pedidoModel) {
        this.pedido = pedidoModel
    }
  
    async get () {
      const pedidos = await this.pedido.findAll()
      return pedidos
    }

}
  
module.exports = PedidoService