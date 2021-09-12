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
                allowNull: true,
            },
            idCliente: {
                type: DataTypes.INTEGER,
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

    return Pedidos;
};
