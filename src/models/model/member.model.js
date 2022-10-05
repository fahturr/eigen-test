const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Member", {
        code: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        tableName: "member",
        underscored: true
    });
};