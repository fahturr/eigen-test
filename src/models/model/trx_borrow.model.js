const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("TrxBorrow", {
        _id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        borrow_date: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: "trx_borrow",
        underscored: true
    });
};