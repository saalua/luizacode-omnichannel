module.exports = (sequelize, DataTypes) => {
    const Lojas = sequelize.define(
        'Lojas',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            filial: {
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
        }
    );

    Lojas.associate = (models) => {
        Lojas.hasMany(models.Pedidos, {
            foreignKey: 'idLoja',
            as: 'loja',
        });
    };

    return Lojas;
};
