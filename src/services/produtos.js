class ProdutoService {
  constructor(ProdutoModel) {
    this.produto = ProdutoModel
  }

  async get() {
    const produtos = await this.produto.findAll()
    return produtos
  }

}


module.exports = ProdutoService