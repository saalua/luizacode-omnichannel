module.exports = (sequelize, DataTypes) => {
    const Clientes = sequelize.define('Clientes', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        endereco: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bairro: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cidade: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cep: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    });

    Clientes.associate = (models) => {
        Clientes.hasMany(models.Pedidos, {
            foreignKey: 'idCliente',
            as: 'loja',
        });
    };
    
    return Clientes;
};
