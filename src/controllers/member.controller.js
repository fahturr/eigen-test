const {models} = require("../models");

exports.register = async (req, res) => {
    try {
        const {name} = req.body;

        const members = await models.Member.findAll({limit: 1, order: [['createdAt', 'DESC']]});
        const lastMembersId = members[0]?.dataValues?.code ?? 0;
        const numberId = parseInt(lastMembersId?.toString()?.split("M")[1]);

        const id = (numberId > 0) ? numberId + 1 : 1;
        const code = `M${(id).toLocaleString('en-US', {minimumIntegerDigits: 3, useGrouping: false})}`;

        await models.Member.create({code, name});

        res.status(200).json({message: 'member has been registered'});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
};

exports.getAllMembers = async (req, res) => {
    try {
        const membersAll = await models.Member.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            order: ['code']
        });

        const borrowData = (await models.TrxBorrow.findAll()).map(m => m.dataValues);

        const member = membersAll.map((m) => {
            const countBook = borrowData.find(f => f.MemberCode === m.dataValues.code);

            return {...m.dataValues, book_borrowed: (countBook !== undefined) ? 1 : 0}
        });

        res.status(200).json({message: 'success fetch data member', data: member});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
};

exports.borrowBook = async (req, res) => {
    try {
        const {book_code, member_code} = req.body;

        const book = await models.Book.findByPk(book_code);
        const member = await models.Member.findByPk(member_code);

        const borrowedMember = await models.TrxBorrow.count({
            where: {member_code}
        });

        const borrowedBook = await models.TrxBorrow.count({
            where: {book_code}
        });

        if (!borrowedMember > 0) {
            if (!borrowedBook > 0) {
                if (member.dataValues.penalized === null) {
                    book.addMember(member, {through: models.TrxBorrow});
                    book.update({stock: 0});

                    res.status(200).json({message: 'success borrowing book'});
                } else {
                    const today = new Date();
                    const borrowedDate = new Date(member.dataValues.penalized);
                    const rulesDate = new Date(borrowedDate.getTime() + (3 * 24 * 60 * 60 * 1000));

                    if (today > rulesDate) {
                        member.update({penalized: null});
                        book.addMember(member, {through: models.TrxBorrow});
                        book.update({stock: 0});

                        res.status(200).json({message: 'success borrowing book'});
                    } else {
                        res.status(400).json({message: 'member still penalized, please wait until penalty over'});
                    }
                }
            } else {
                res.status(400).json({message: 'cannot borrow, books has been borrowed'});
            }
        } else {
            res.status(400).json({message: 'cannot borrow more than 2 books'});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
};

exports.returnBook = async (req, res) => {
    try {
        const {book_code, member_code} = req.body;

        const returnedBook = await models.TrxBorrow.findAll({
            where: {book_code, member_code},
            limit: 1
        });

        if (!returnedBook?.length > 0) {
            res.status(404).json({message: 'borrow data is not found'});
        } else {
            const book = await models.Book.findByPk(book_code);
            await book.update({stock: 1});

            const today = new Date();
            const borrowedDate = new Date(returnedBook[0].createdAt);
            const rulesDate = new Date(borrowedDate.getTime() + (7 * 24 * 60 * 60 * 1000));

            if (today > rulesDate) {
                const member = await models.Member.findByPk(member_code);
                await member.update({penalized: new Date().toISOString()});
                await returnedBook[0].destroy();

                res.status(200).json({message: 'success returning book, but user getting penalty, cannot borrow book for 3 days ahead'});
            } else {
                await returnedBook[0].destroy();
                res.status(200).json({message: 'success returning book'});
            }
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
};