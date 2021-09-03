const express = require('express')
const routers = require('./api')
const { sequelize } = require('./models')

const app = express()

app.use(express.json())
app.use(express.urlencoded({  extended:true }));
app.use('/', routers)

sequelize.sync().then(() => {
    console.log('Conectado com o banco com sucesso!')
})


app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor rodando`);
});