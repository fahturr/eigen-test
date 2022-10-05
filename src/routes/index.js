const express = require("express");
const routes = express.Router();

const member = require("./member.route"),
    book = require("./book.route");

routes.use('/member', member);
routes.use('/book', book);

module.exports = routes;