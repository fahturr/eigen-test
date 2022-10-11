const express = require("express");
const routes = express.Router();

const member = require("./member.route"),
    book = require("./book.route");

/**
 * @swagger
 * components:
 *  responses:
 *      ErrorInternalServer:
 *          description: something is wrong
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Response'
 *      SuccessRequest:
 *          description: request has been fulfilled
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Response'
 *  schemas:
 *      Response:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 */

/**
 * @swagger
 * tags:
 *  name: Book
 *  name: Member
 */

routes.use('/member', member);
routes.use('/book', book);

module.exports = routes;