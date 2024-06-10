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
