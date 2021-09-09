module.exports = (sequelize, DataTypes) => {
    const ProdutosPedidos = sequelize.define(
        'ProdutosPedidos',
        {
            idPedido: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            idProduto: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
        },
        {
            timestamps: false,
        }
    );

    ProdutosPedidos.associate = (models) => {
        ProdutosPedidos.belongsTo(models.Pedido, {foreignKey: 'idPedido'})
        ProdutosPedidos.belongsTo(models.Produtos, {foreignKey: 'idProduto'})
    };

    return ProdutosPedidos;
};
