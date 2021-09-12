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

  async getByEmail(email) {
    const clientes = await this.model.findOne({
      where: { email: email },
    });
    return clientes;
  }

  async createUser(nome, logradouro, bairro, cidade, cep, email, senha) {
    const findCliente = await this.getByEmail(email);

    if (findCliente) {
      throw new Error('Usuário já cadastrado!');
    }

    try {
      await this.model.create({
        nome,
        logradouro,
        bairro,
        cidade,
        cep,
        email,
        senha,
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = {ClienteService}