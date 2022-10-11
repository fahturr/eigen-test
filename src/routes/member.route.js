const express = require("express");
const routes = express.Router();

const {
    getAllMembers,
    register,
    borrowBook,
    returnBook
} = require("../controllers/member.controller");

/**
 * @swagger
 * components:
 *  schemas:
 *      MemberRequest:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *      MemberResponse:
 *          type: object
 *          properties:
 *              code:
 *                  type: string
 *              name:
 *                  type: string
 *              penalized:
 *                  type: string
 *              book_borrowed:
 *                  type: integer
 *      BorrowRequest:
 *          type: object
 *          properties:
 *              book_code:
 *                  type: string
 *              member_code:
 *                  type: string
 */

/**
 * @swagger
 * /member:
 *  get:
 *      summary: Get all members
 *      tags: [Member]
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
 *                                      $ref: '#/components/schemas/MemberResponse'
 */
routes.get('/', getAllMembers);

/**
 * @swagger
 * /member/register:
 *  post:
 *      summary: Register member
 *      tags: [Member]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/MemberRequest'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/SuccessRequest'
 *          500:
 *              $ref: '#/components/responses/ErrorInternalServer'
 */
routes.post('/register', register);

/**
 * @swagger
 * /member/borrow_book:
 *  post:
 *      summary: Borrow book
 *      tags: [Member]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/BorrowRequest'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/SuccessRequest'
 *          500:
 *              $ref: '#/components/responses/ErrorInternalServer'
 */
routes.post('/borrow_book', borrowBook);

/**
 * @swagger
 * /member/return_book:
 *  post:
 *      summary: Return book
 *      tags: [Member]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/BorrowRequest'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/SuccessRequest'
 *          500:
 *              $ref: '#/components/responses/ErrorInternalServer'
 */
routes.post('/return_book', returnBook);

module.exports = routes;