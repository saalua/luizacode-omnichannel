module.exports = (sequelize, DataTypes) => {
    const Pedidos = sequelize.define(
        'Pedidos',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            idLoja: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'lojas',
                    key: 'id',
                },
            },
            idCliente: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'clientes',
                    key: 'id',
                },
            },
            total: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );

    Pedidos.associate = (models) => {
        Pedidos.belongsTo(models.Clientes, {
            foreignKey: 'idCliente',
            as: 'cliente',
        });
        Pedidos.belongsTo(models.Lojas, {
            foreignKey: 'idLoja',
            as: 'loja',
        });
        Pedidos.belongsToMany(models.Produtos, {
            through: 'ProdutosPedidos',
            foreignKey: 'idPedido',
            as: 'pedido',
        })
    };

    return Pedidos;
};
