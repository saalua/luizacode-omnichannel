const swaggerAutogen = require('swagger-autogen')()

const outputFile = './src/swagger_output.json'
const endpointFile = ['./src/app.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "Luiza<Code> - Omni Channel",
        description: "API NodeJS que desempenha a funcionalidade de Omni Channel do cliente. Projeto proposto no encerramento da aceleração Luiza Code, turma NodeJS."
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Lojas",
            "description": "Endpoints relacionados às lojas."
        },
        { 
            "name": "Produtos",
            "description": "Endpoints relacionados ao recursos de produto."
        },
        {
            "name": "Clientes",
            "description": "Endpoints relacionados ao usuário."
        },
        {
            "name": "Pedidos",
            "description": "Endpoints relacionados aos pedidos do cliente."
        }
    ],
    definitions: {
        Lojas: {
            id: 1,
            filial: "Magalu SP",
            endereco: "Bairro Lago das Rosas, quadra 70, rua 92.",
            bairro: "Lago das Rosas",
            cidade: "São Paulo",
            cep: "12345678",
            updated_at: '2021-12-12 03:03:00',
            created_at: '2021-12-12 03:03:00'
        },
        Produtos: {
            id: 1,
            produto: 'Notebook',
            categoria: 'Informática',
            valor: 2500,
            descricao: 'Notebook com memória de 4GB, SSD de 128GB, processamento em 64bits, branco.',
            marca: 'Dell',
            updated_at: '2021-12-12 03:03:00',
            created_at: '2021-12-12 03:03:00'
        },
        Clientes: {
            nome: "Ana",
            endereco: "São Paulo, rua Augusta, n° 835.",
            bairro: "Jardim da Liberdade",
            cidade: "São Paulo",
            cep: "12345678"
        }
    }
}

swaggerAutogen(outputFile, endpointFile, doc)