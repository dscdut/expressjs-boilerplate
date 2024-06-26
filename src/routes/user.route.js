'use strict';
import express from 'express';
import asyncHandler from '@/utils/asyncHandler';
import { authenticateToken } from '@/middlewares/authentication';
import userController from '@/controller/user.controller';
import validateRequest from '@/middlewares/validate';
import { getUsersPagination, updateUserByOwner } from '@/validations';

const router = express.Router();

router.put('/', validateRequest(updateUserByOwner), authenticateToken, asyncHandler(userController.updateUserByOwner));
router.get('/', validateRequest(getUsersPagination), asyncHandler(userController.getUsersPagination));

export default router;
