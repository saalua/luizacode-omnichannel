module.exports = (sequelize, DataTypes) => {
    const ProdutosPedidos = sequelize.define(        
        'ProdutosPedidos', {

        }, { timestamps: false }
    );
    return ProdutosPedidos;
};
