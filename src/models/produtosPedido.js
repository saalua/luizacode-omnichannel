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
            timestamps: false,
        }
    );

    return ProdutosPedidos;
};
