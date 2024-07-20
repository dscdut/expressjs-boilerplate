'use strict';
import express from 'express';
import asyncHandler from '@/utils/asyncHandler';
import OrderController from '@/controller/order.controller';
import validateRequest from '@/middlewares/validate';
import { CheckOrderRequest, CreateOrder } from '@/modules/order/validations';

const router = express.Router();

router.post('/', validateRequest(CreateOrder), asyncHandler(OrderController.createOrder));
router.put('/:payment_order_id/capture', validateRequest(CheckOrderRequest), asyncHandler(OrderController.updateOrder));

export default router;
