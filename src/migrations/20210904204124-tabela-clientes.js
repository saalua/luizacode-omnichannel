'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Clientes', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nome: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            endereco: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            bairro: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            cidade: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            cep: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Clientes');
    }
};
