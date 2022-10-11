const express = require("express");
const routes = express.Router();

const {addBook, getAllBook} = require("../controllers/book.controller");

/**
 * @swagger
 * components:
 *  schemas:
 *      BookRequest:
 *          type: object
 *          properties:
 *              code:
 *                  type: string
 *              title:
 *                  type: string
 *              author:
 *                  type: string
 *      BookResponse:
 *          type: object
 *          properties:
 *              code:
 *                  type: string
 *              title:
 *                  type: string
 *              author:
 *                  type: string
 *              stock:
 *                  type: integer
 */

/**
 * @swagger
 * /book:
 *  get:
 *      summary: Return all books
 *      tags: [Book]
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/BookResponse'
 */
routes.get('/', getAllBook);
/**
 * @swagger
 * /book/insert:
 *  post:
 *      summary: Insert books
 *      tags: [Book]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/BookRequest'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/SuccessRequest'
 *          500:
 *              $ref: '#/components/responses/ErrorInternalServer'
 */
routes.post('/insert', addBook);

module.exports = routes;