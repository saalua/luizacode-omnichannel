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

cliente.hasMany(pedido);
pedido.belongsTo(cliente);

loja.hasMany(pedido);
pedido.belongsTo(loja);

pedido.hasMany(produtosPedido);
produto.hasMany(produtosPedido);

const db = {
  loja,
  produto,
  cliente,
  pedido,
  produtosPedido,
  sequelize,
};

module.exports = db;
