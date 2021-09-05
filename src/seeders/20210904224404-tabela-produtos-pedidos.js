'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'ProdutosPedidos',
            [
                {
                    idPedido: 1,
                    idProduto: 1,
                },
                {
                    idPedido: 1,
                    idProduto: 5,
                },
                {
                    idPedido: 2,
                    idProduto: 3,
                },
                {
                    idPedido: 3,
                    idProduto: 5,
                },
                {
                    idPedido: 3,
                    idProduto: 8,
                },
                {
                    idPedido: 3,
                    idProduto: 10,
                },
                {
                    idPedido: 4,
                    idProduto: 7,
                },
                {
                    idPedido: 5,
                    idProduto: 6,
                },
                {
                    idPedido: 5,
                    idProduto: 7,
                },
                {
                    idPedido: 5,
                    idProduto: 8,
                },
                {
                    idPedido: 6,
                    idProduto: 8,
                },
            ],
            {
                tableName: 'produtosPedidos',
                timestamps: false,
            }
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('ProdutosPedidos', null, {});
    },
};
