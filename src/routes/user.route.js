'use strict';
import express from 'express';
import asyncHandler from '@/utils/asyncHandler';
import { authenticateToken } from '@/middlewares/authentication';
import userController from '@/controller/user.controller';
import validateRequest from '@/middlewares/validate';
import { updateUserByOwner } from '@/validations';

const router = express.Router();

router.put('/', validateRequest(updateUserByOwner), authenticateToken, asyncHandler(userController.updateUserByOwner));

export default router;
