module.exports = (sequelize, DataTypes) => {
    const Pedidos = sequelize.define(
        'Pedidos',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }
    );

    return Pedidos;
};
