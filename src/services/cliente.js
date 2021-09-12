class ClienteService {

  constructor(ClienteModel) {
    this.model = ClienteModel;
  }

  async get() {
    return await this.model.findAll();
  }
  
  async getById(id) {
    const result = await this.model.findOne({
      where: {
        id
      }
    });
    return result;
  }

  async create(cliente) {
    const {nome, endereco, bairro, cidade, cep} = cliente;
    return await cliente.create({nome, endereco, bairro, cidade, cep});
  }
}

module.exports = {ClienteService};