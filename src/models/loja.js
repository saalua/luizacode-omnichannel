module.exports = (sequelize, DataTypes) => {
    const Lojas = sequelize.define(
        'Loja',
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
            tableName: 'lojas',
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
