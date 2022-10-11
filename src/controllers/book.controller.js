const {models} = require("../models");
const { Op } = require("sequelize");

exports.getAllBook = async (req, res) => {
    try {
        const books = await models.Book.findAll({
            order: ['title'],
            attributes: {exclude: ['createdAt', 'updatedAt']},
            where: {
                stock: {[Op.gt]: 0}
            }
        });

        res.status(200).json({message: 'success fetching books data', data: books});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
};

exports.addBook = async (req, res) => {
    try {
        const books = req.body.map(m => {
            return {...m, stock: 1}
        });

        await models.Book.bulkCreate(books);

        res.status(201).json({message: 'book added successfully'});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
};