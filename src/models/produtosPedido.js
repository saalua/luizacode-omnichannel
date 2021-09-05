module.exports = (sequelize, DataTypes) => {
    const ProdutosPedidos = sequelize.define(
        'ProdutosPedidos',
        {
            idPedido: {
                types: DataTypes.INTEGER,
                allowNull: false
            },
            idProduto: {
                types: DataTypes.INTEGER,
                allowNull: false
            },
        },
        {
            tableName: 'produtosPedidos',
            timestamps: false,
        }
    );

    ProdutosPedidos.associate = (models) => {
        ProdutosPedidos.belongsTo(models.Pedido, {foreignKey: 'idPedido'})
        ProdutosPedidos.belongsTo(models.Produtos, {foreignKey: 'idProduto'})
    };

    return ProdutosPedidos;
};
