class ProdutoService {
  constructor(ProdutoModel) {
    this.produto = ProdutoModel
  }

  async get() {
    const produtos = await this.produto.findAll();
    return produtos;
  }

  async getById(id) {
    const produto = await this.produto.findOne({
      where: {
        id
      }
    });
    return produto;
  }
}


module.exports = ProdutoService