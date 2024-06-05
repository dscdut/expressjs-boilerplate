'use strict';
import express from 'express';
import asyncHandler from '@/utils/asyncHandler';
import authController from '@/controller/auth.controller';
import validate from '@/middlewares/validate';
import { register, login } from '@/validations/auth.validation';

const router = express.Router();

router.post('/register', validate(register), asyncHandler(authController.register));
router.post('/login', validate(login), asyncHandler(authController.login));

export default router;

/**
 * @swagger
 * /auth/register:
 *    post:
 *      summary: Register as user
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *                - email
 *                - password
 *                - role
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                  format: email
 *                  description: must be unique
 *                password:
 *                  type: string
 *                  format: password
 *                  minLength: 6
 *                  description: At least one number and one letter
 *                confirm_password:
 *                  type: string
 *                  format: password
 *                  minLength: 6
 *                  description: At least one number and one letter
 *                role:
 *                  type: number
 *                  name: amdin/member
 *              example:
 *                name: fake name
 *                email: fake@example.com
 *                password: password123
 *                confirm_password: password123
 *                role: 2
 *      responses:
 *        "201":
 *          description: CREATED
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        "400":
 *          description: Invalid Syntax
 *          content:
 *            appliactions/json:
 *              examples:
 *                error_104_example:
 *                  $ref: '#/components/examples/error_104_example'
 *        "409":
 *          description: Email already exists
 *          content:
 *            applications/json:
 *              examples:
 *                error_108_example:
 *                  $ref: '#/components/examples/error_108_example'
 *        "500":
 *          description: An unexpected error occurred on the server
 *          content:
 *            application/json:
 *              examples:
 *                error_103_example:
 *                  $ref: '#/components/examples/error_103_example'
 */

/**
 * @swagger
 * /auth/login:
 *    post:
 *      summary: Login
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - password
 *              properties:
 *                email:
 *                  type: string
 *                  format: email
 *                password:
 *                  type: string
 *                  format: password
 *              example:
 *                email: fake@example.com
 *                password: password123
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AccessToken'
 *        "400":
 *          description: The email and password field is required
 *          content:
 *            application/json:
 *              examples:
 *                error_101_example:
 *                  $ref: '#/components/examples/error_101_example'
 *        "401":
 *          description: Incorrect email or password
 *          content:
 *            application/json:
 *              examples:
 *                error_102_example:
 *                  $ref: '#/components/examples/error_102_example'
 *        "500":
 *          description: An unexpected error occurred on the server
 *          content:
 *            application/json:
 *              examples:
 *                error_103_example:
 *                  $ref: '#/components/examples/error_103_example'
 */
