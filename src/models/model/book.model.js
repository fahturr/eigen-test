const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Book", {
        code: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: "book",
        underscored: true
    });
};