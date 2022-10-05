const express = require("express");
const routes = express.Router();

const { getAllMembers, register } = require("../controllers/member.controller");

routes.get('/', getAllMembers);
routes.post('/register', register);

module.exports = routes;