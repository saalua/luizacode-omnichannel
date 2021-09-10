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

    return ProdutosPedidos;
};
