'use strict';
import express from 'express';
import asyncHandler from '@/utils/asyncHandler';
import { authenticateToken } from '@/middlewares/authentication';
import userController from '@/controller/user.controller';
import validate from '@/middlewares/validate';
import { deleteUser } from '@/validations/user.validation';

const router = express.Router();

router.delete('/:id', validate(deleteUser), authenticateToken, asyncHandler(userController.deleteUser));

export default router;
