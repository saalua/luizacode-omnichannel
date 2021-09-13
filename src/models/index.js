const sequelize = require('../config/sequelize');
const Sequelize = require('sequelize');

const Loja = require('./loja');
const loja = Loja(sequelize, Sequelize.DataTypes);

const Produto = require('./produto');
const produto = Produto(sequelize, Sequelize.DataTypes);

const Cliente = require('./cliente');
const cliente = Cliente(sequelize, Sequelize.DataTypes);

const Pedido = require('./pedido');
const pedido = Pedido(sequelize, Sequelize.DataTypes);

const ProdutosPedidos = require('./produtosPedido');
const produtosPedido = ProdutosPedidos(sequelize, Sequelize.DataTypes);

cliente.hasMany(pedido, { foreignKey: 'idCliente' });
pedido.belongsTo(cliente, { foreignKey: 'idCliente' });

loja.hasMany(pedido, { foreignKey: 'idLoja' });
pedido.belongsTo(loja, { foreignKey: 'idLoja' });

produto.belongsToMany(pedido, { through: 'ProdutosPedidos' });
pedido.belongsToMany(produto, { through: 'ProdutosPedidos' });


const db = {
  loja,
  produto,
  cliente,
  pedido,
  produtosPedido,
  sequelize,
};

module.exports = db;
