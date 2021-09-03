const express = require('express')
const routers = require('./api')
const { sequelize } = require('./models')

const app = express()

app.use(express.json())
app.use('/', routers)

sequelize.sync().then(() => {
    console.log('Conectado com o banco com sucesso!')
})

var server = app.listen(process.env.PORT || 3000, () => {
    console.log("Server listening on port %d in %s mode", server.address().port, app.settings.env);
});