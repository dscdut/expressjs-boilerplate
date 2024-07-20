'use strict';
import express from 'express';
import asyncHandler from '@/utils/asyncHandler';
import { authenticateToken } from '@/middlewares/authentication';
import UserController from '@/controller/user.controller';
import validateRequest from '@/middlewares/validate';
import { getUsersPagination, updateUserByOwner } from '@/validations';

const router = express.Router();

router.put('/', validateRequest(updateUserByOwner), authenticateToken, asyncHandler(UserController.updateUserByOwner));
router.get('/', validateRequest(getUsersPagination), asyncHandler(UserController.getUsersPagination));

export default router;
