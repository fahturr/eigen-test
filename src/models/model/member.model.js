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
        penalized: {
            type: DataTypes.DATE
        }
    }, {
        tableName: "member",
        underscored: true
    });
};