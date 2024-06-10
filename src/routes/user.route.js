'use strict';
import express from 'express';
import asyncHandler from '@/utils/asyncHandler';
import { authenticateToken } from '@/middlewares/authentication';
import userController from '@/controller/user.controller';
import validate from '@/middlewares/validate';
import { getUsers, updateUserByOwner } from '@/validations';

const router = express.Router();

router.put('/', validate(updateUserByOwner), authenticateToken, asyncHandler(userController.updateUserByOwner));
router.get('/', validate(getUsers), asyncHandler(userController.getUsers));

export default router;
