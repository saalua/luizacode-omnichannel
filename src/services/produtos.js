class ProdutoService {
  constructor(ProdutoModel) {
    this.produto = ProdutoModel
  }

  async get() {
    const produtos = await this.produto.findAll()
    return produtos
  }

  async getProdutoById() {
    const produto = await this.produto.findOne()
    return produto
  }

}

module.exports = ProdutoService