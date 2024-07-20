import Joi from 'joi';
import { JoiUtils } from '@/utils/joi.util';

export const CreateOrder = {
    body: Joi.object().keys({
        customer_name: JoiUtils.fullName(),
        customer_phone: JoiUtils.phoneNumber(),
        payment_method_id: JoiUtils.integerId(),
        price: JoiUtils.price(),
        currency: Joi.string().required(),
    }),
};

export const CheckOrderRequest = {
    params: Joi.object().keys({
        payment_order_id: JoiUtils.uuid(),
    })
}