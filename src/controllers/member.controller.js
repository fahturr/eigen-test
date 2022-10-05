const { models } = require("../models");

exports.register = async (req, res) => {
    try {
        const { name } = req.body;

        const members = await models.Member.findAll({ limit: 1, order: [['createdAt', 'DESC']] });
        const lastMembersId = members[0].dataValues.code;

        const id = parseInt(lastMembersId.split("M")[1]) + 1;
        const code = `M${(id).toLocaleString('en-US', { minimumIntegerDigits: 3, useGrouping: false })}`;

        await models.Member.create({ code, name });

        res.status(200).json({ message: 'member has been registered' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

exports.getAllMembers = async (req, res) => {
    try {
        const members = await models.Member.findAll({ attributes: ['code', 'name'] });

        res.status(200).json({ message: 'succes fetch data member', data: members });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};