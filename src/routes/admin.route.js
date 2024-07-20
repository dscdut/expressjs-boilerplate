'use strict';
import express from 'express';
import asyncHandler from '@/utils/asyncHandler';
import UserController from '@/controller/user.controller';
import { id, updateUserByAdmin } from '@/validations';
import validateRequest from '@/middlewares/validate';

const router = express.Router();

router.delete('/users/:id', validateRequest(id), asyncHandler(UserController.deleteUser));
router.put('/users/:id', validateRequest(updateUserByAdmin), asyncHandler(UserController.updateUserByAdmin));

export default router;
