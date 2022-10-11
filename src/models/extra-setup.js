exports.applyExtraSetup = (sequelize) => {
    const {
        Member,
        Book,
        TrxBorrow,
    } = sequelize.models;

    Book.belongsToMany(Member, {through: TrxBorrow});
    Member.belongsToMany(Book, {through: TrxBorrow});

};