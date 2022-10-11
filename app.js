const express = require("express"),
    bodyParser = require("body-parser"),
    swaggerUI = require('swagger-ui-express'),
    swaggerJSDocs = require('swagger-jsdoc');

const sequelize = require("./src/models");
const routes = require("./src/routes");

const swaggerOption = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "Eigen Test API"
        },
        server: [
            {
                url: `http://localhost:${process.env.APP_PORT}`
            }
        ],
    },
    apis: ['./src/routes/*.js'],
};

const specs = swaggerJSDocs(swaggerOption);

const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use(bodyParser.json());
app.use(routes);

(async () => {
    try {
        await sequelize.sync({force: false});
    } catch (err) {
        console.log(err);
    }
})();

module.exports = app;
