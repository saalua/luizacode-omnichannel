'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ProdutosPedidos', {
            idPedido: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Pedidos',
                    key: 'id'
                }
            },
            idProduto: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Produtos',
                    key: 'id'
                }
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('ProdutosPedidos');
    },
};
