'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'Clientes',
            [
                {
                    nome: 'JULIA DUTRA',
                    endereco: 'RUA DOUTOR HUGO FORTES',
                    bairro: 'LAGOINHA',
                    cidade: 'RIBEIRAO PRETO',
                    cep: '14095260',
                },
                {
                    nome: 'LAYANE LINO',
                    endereco: 'R: DEODORO',
                    bairro: 'CENTRO',
                    cidade: 'FLORIANOPOLIS',
                    cep: '88010020',
                },
                {
                    nome: 'LETÍCIA CESION',
                    endereco: 'AV: ANICETO ZACCHI',
                    bairro: 'PONTE IMARUIM',
                    cidade: 'PALHOCA',
                    cep: '88130301',
                },
                {
                    nome: 'LUANA SANTOS',
                    endereco: 'QUINZE DE NOVEMBRO',
                    bairro: 'VILA NOVA',
                    cidade: 'JOINVILLE',
                    cep: '89237000',
                },
                {
                    nome: 'NATHÁLIA VENEZIANO',
                    endereco: 'JOSE JOAQUIM SEABRA',
                    bairro: 'BAIXA DOS SAPATEIROS',
                    cidade: 'SALVADOR',
                    cep: '40025001',
                },
                {
                    nome: 'WALQUIRIA LIMA',
                    endereco: 'JOSE JOAQUIM SEABRA',
                    bairro: 'BAIXA DOS SAPATEIROS',
                    cidade: 'SALVADOR',
                    cep: '40025001',
                },
            ],
            {
                tableName: 'clientes',
                timestamps: false,
            }
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Clientes', null, {});
    },
};
