'use strict';
import express from 'express';
import asyncHandler from '@/utils/asyncHandler';
import AuthController from '@/controller/auth.controller';
import validateRequest from '@/middlewares/validate';
import { register, login } from '@/validations/auth.validation';

const router = express.Router();

router.post('/register', validateRequest(register), asyncHandler(AuthController.register));
router.post('/login', validateRequest(login), asyncHandler(AuthController.login));

export default router;
