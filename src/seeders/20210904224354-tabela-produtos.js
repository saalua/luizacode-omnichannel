'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'Produtos',
            [
                {
                    produto: 'SMARTPHONE SAMSUNG GALAXY A32 128GB VIOLETA 4G',
                    categoria: 'CELULARES E SMARTPHONES',
                    valor: 1579,
                    descricao: 'SMARTPHONE SAMSUNG GALAXY A32 128GB VIOLETA 4G',
                    marca: 'SAMSUNG',
                },
                {
                    produto: 'SAIA BOX MATELADA CASAL KING',
                    categoria: 'CAMA, MESA E BANHO',
                    valor: 40.92,
                    descricao: 'SAIA BOX MATELADA CASAL KING',
                    marca: 'MMARTAN',
                },
                {
                    produto: 'GELADEIRA/REFRIGERADOR CONSUL FROST FREE',
                    categoria: 'ELETRODOMÉSTICOS',
                    valor: 3231.55,
                    descricao: 'GELADEIRA/REFRIGERADOR CONSUL FROST FREE',
                    marca: 'CONSUL',
                },
                {
                    produto: 'COIFA DE PAREDE FOGATTI INOX 75CM 3 VELOCIDADES',
                    categoria: 'ELETRODOMÉSTICOS',
                    valor: 839.9,
                    descricao: 'COIFA DE PAREDE FOGATTI INOX 75CM 3 VELOCIDADES',
                    marca: 'FOGATTI',
                },
                {
                    produto: 'APARADOR BUFFET 4 PORTAS VENEZA MULTIMÓVEIS PRETO',
                    categoria: 'MÓVEIS',
                    valor: 215.91,
                    descricao: 'APARADOR BUFFET 4 PORTAS VENEZA MULTIMÓVEIS PRETO',
                    marca: 'VENEZA',
                },
                {
                    produto: 'IPHONE 11 APPLE 64GB PRETO 6,1” 12MP IOS',
                    categoria: 'CELULARES E SMARTPHONES',
                    valor: 3984,
                    descricao: 'IPHONE 11 APPLE 64GB PRETO 6,1” 12MP IOS',
                    marca: 'APPLE',
                },
                {
                    produto: 'LAVADORA DE ROUPAS MIDEA STORM WASH LFA11X1',
                    categoria: 'ELETRODOMÉSTICOS',
                    valor: 2799.9,
                    descricao: 'LAVADORA DE ROUPAS MIDEA STORM WASH LFA11X1',
                    marca: 'MIDEA',
                },
                {
                    produto: 'IMPRESSORA MULTIFUNCIONAL EPSON ECOTANK L4160',
                    categoria: 'INFORMÁTICA',
                    valor: 1599,
                    descricao: 'IMPRESSORA MULTIFUNCIONAL EPSON ECOTANK L4160',
                    marca: 'EPSON',
                },
                {
                    produto: 'SMARTPHONE MOTOROLA MOTO G30 128GB WHITE LILAC 4G',
                    categoria: 'CELULARES E SMARTPHONES',
                    valor: 1259.1,
                    descricao: 'SMARTPHONE MOTOROLA MOTO G30 128GB WHITE LILAC 4G',
                    marca: 'MOTOROLA',
                },
                {
                    produto: 'COBERTOR CASAL MICROFIBRA DYURI ANDORRA',
                    categoria: 'CAMA, MESA E BANHO',
                    valor: 99.9,
                    descricao: 'COBERTOR CASAL MICROFIBRA DYURI ANDORRA',
                    marca: 'DYURI',
                },
            ],
            {
                tableName: 'produtos',
                timestamps: false,
            }
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Produtos', null, {});
    },
};
