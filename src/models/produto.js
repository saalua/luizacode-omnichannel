module.exports = (sequelize, DataTypes) => {
    const Produtos = sequelize.define('Produtos', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        produto: {
            type: DataTypes.STRING,
            allowNull: false
        },
        categoria: {
            type: DataTypes.STRING,
            allowNull: false
        },
        valor: {
            type: DataTypes.FLOAT, 
            allowNull: false
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: false
        },
        marca: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false,
    });

    return Produtos;
}
