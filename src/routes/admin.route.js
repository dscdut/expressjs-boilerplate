'use strict';
import express from 'express';
import asyncHandler from '@/utils/asyncHandler';
import userController from '@/controller/user.controller';
import validate from '@/middlewares/validate';
import { id, updateUserByAdmin } from '@/validations';

const router = express.Router();

router.delete('/users/:id', validate(id), asyncHandler(userController.deleteUser));
router.put('/users/:id', validate(updateUserByAdmin), asyncHandler(userController.updateUserByAdmin));

export default router;
