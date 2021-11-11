module.exports = (sequelize, dataTypes) => {
    let alias = 'CompraLibro';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        idCompra: {
            type: dataTypes.INTEGER(10),
            allowNull: false
        },
        idLibro: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        cantidad: {
            type: dataTypes.INTEGER(10),
            allowNull: false
        },
        precioUnitarioLibro: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
        },
        formato: {
            type: dataTypes.STRING(50),
            allowNull: false,
            defaultValue: 'pasta blanda'
        }
        
    };
    let config = {
        tableName: 'compraLibros',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deleteAt: false
    }

    const CompraLibro = sequelize.define(alias, cols, config);
    // CompraLibro.associate = function (models) {}
    return CompraLibro;

}