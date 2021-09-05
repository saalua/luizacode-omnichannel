'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'Pedidos',
            [
                {
                    idLoja: 3,
                    idCliente: 1,
                    total: 1794.91,
                    status: 'ANDAMENTO',
                },
                {
                    idLoja: 1,
                    idCliente: 5,
                    total: 3231.55,
                    status: 'REALIZADA',
                },
                {
                    idLoja: 5,
                    idCliente: 6,
                    total: 1914.81,
                    status: 'REALIZADA',
                },
                {
                    idLoja: 2,
                    idCliente: 4,
                    total: 2799.9,
                    status: 'RETIRADO',
                },
                {
                    idLoja: 4,
                    idCliente: 2,
                    total: 8382.9,
                    status: 'ANDAMENTO',
                },
                {
                    idLoja: 1,
                    idCliente: 3,
                    total: 1599,
                    status: 'ANDAMENTO',
                },
            ],
            {
                tableName: 'pedidos',
                timestamps: false,
            }
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Pedidos', null, {});
    },
};
