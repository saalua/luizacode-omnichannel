class ClienteService {
  constructor(ClienteModel) {
    this.cliente = ClienteModel;
  }

  async getByEmail(email) {
    const clientes = await this.cliente.findOne({
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
      await this.cliente.create({
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

module.exports = ClienteService;
