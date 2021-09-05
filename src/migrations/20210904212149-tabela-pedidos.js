'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Pedidos', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            idLoja: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Lojas',
                    key: 'id',
                },
            },
            idCliente: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Clientes',
                    key: 'id',
                },
            },
            total: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            status: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Pedidos');
    },
};
