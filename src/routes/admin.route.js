'use strict';
import express from 'express';
import asyncHandler from '@/utils/asyncHandler';
import userController from '@/controller/user.controller';
import { id } from '@/validations';
import validateRequest from '@/middlewares/validate';

const router = express.Router();

router.delete('/users/:id', validateRequest(id), asyncHandler(userController.deleteUser));

export default router;
