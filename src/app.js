const express = require('express')
const routers = require('./api')

const app = express()

app.use(express.json())
app.use('/', routers)



app.listen(process.env.PORT || 3000, () => {
    console.log("Server listening on port %d in %s mode", this.address().port, app.settings.env);
});