'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'Lojas',
            [
                {
                    filial: 'MAGAZINE LUIZA - RIBEIRAO PRETO',
                    endereco: 'RUA DOUTOR HUGO FORTES',
                    bairro: 'LAGOINHA',
                    cidade: 'RIBEIRAO PRETO',
                    cep: '14095260',
                },
                {
                    filial: 'MAGAZINE LUIZA - FLORIANOPOLIS',
                    endereco: 'R: DEODORO',
                    bairro: 'CENTRO',
                    cidade: 'FLORIANOPOLIS',
                    cep: '88010020',
                },
                {
                    filial: 'MAGAZINE LUIZA - PALHOCA',
                    endereco: 'AV: ANICETO ZACCHI',
                    bairro: 'PONTE IMARUIM',
                    cidade: 'PALHOCA',
                    cep: '88130301',
                },
                {
                    filial: 'MAGAZINE LUIZA - JOINVILLE',
                    endereco: 'QUINZE DE NOVEMBRO',
                    bairro: 'VILA NOVA',
                    cidade: 'JOINVILLE',
                    cep: '89237000',
                },
                {
                    filial: 'MAGAZINE LUIZA - SALVADOR',
                    endereco: 'JOSE JOAQUIM SEABRA',
                    bairro: 'BAIXA DOS SAPATEIROS',
                    cidade: 'SALVADOR',
                    cep: '40025001',
                },
            ],
            {
                tableName: 'lojas',
                timestamps: false,
            }
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Lojas', null, {});
    },
};
