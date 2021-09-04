'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Produtos', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            produto: {
                type: Sequelize.STRING,
                allowNull: false
            },
            categoria: {
                type: Sequelize.STRING,
                allowNull: false
            },
            valor: {
                type: Sequelize.FLOAT, 
                allowNull: false
            },
            descricao: {
                type: Sequelize.STRING,
                allowNull: false
            },
            marca: {
                type: Sequelize.STRING,
                allowNull: false
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Produtos');
    },
};
