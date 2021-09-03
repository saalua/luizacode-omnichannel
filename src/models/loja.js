const loja = (sequelize, DataTypes) => {
    const Loja = sequelize.define('Loja', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        endereco: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'loja'
    })
    return Loja
}
module.exports = loja