exports.applyExtraSetup = (sequelize) => {
    const {
        Member,
        Book,
        TrxBorrow,
    } = sequelize.models;

    Book.belongsTo(TrxBorrow, { as: "trx_borrow", foreignKey: "_id" });
    Member.belongsTo(TrxBorrow, { as: "trx_borrow", foreignKey: "_id" });

};