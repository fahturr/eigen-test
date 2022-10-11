const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("TrxBorrow", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    }, {
        tableName: "trx_borrow",
        underscored: true
    });
};