const swaggerAutogen = require('swagger-autogen')()

const outputFile = './src/swagger_output.json'
const endpointFile = ['./src/app.js']

const doc = {

}

swaggerAutogen(outputFile, endpointFile, doc)