module.exports = (sequelize, DataTypes) => {
    const ProdutosPedidos = sequelize.define(
        'ProdutosPedidos',
        {
            valor: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );

    // ProdutosPedidos.removeAttribute('id');

    return ProdutosPedidos;
};
