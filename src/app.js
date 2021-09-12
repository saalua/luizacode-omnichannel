const express = require('express')
const routers = require('./api')
const { sequelize } = require('./models')

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const app = express()

app.use(express.json())
app.use(express.urlencoded({  extended:true }));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use('/', routers)

sequelize.sync().then(() => {
    console.log('Conectado com o banco com sucesso!')
})

var server = app.listen(process.env.PORT || 3000, () => {
    console.log("Server listening on port %d in %s mode", server.address().port, app.settings.env);

});