const express = require("express");
const routes = express.Router();

const { addBook } = require("../controllers/book.controller");

routes.post('/insert', addBook);

module.exports = routes;