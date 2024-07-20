'use strict';

import { BAD_REQUEST, NOT_FOUND } from 'http-status';
import { ErrorResponse } from '@/response/error.response';
import { errorCodes, errorMessages } from '@/response/httpResponse';
import { Optional } from '@/utils/optional';
import { PaymentMethodRepository, OrderRepository } from '@/modules/order/repository';
import { VnpayHelper } from '@/modules/order/utils';

class OrderService {

    static findOneBy = async (column, value) => {
        return Optional.of(await OrderRepository.findOneBy(column, value))
            .throwIfNotPresent(new ErrorResponse(errorMessages.ORDER_ID_NOT_EXIST, NOT_FOUND, errorCodes.ORDER_ID_NOT_EXIST))
            .get();
    };

    static createOrder = async (CreateOrderDto) => {
        const { payment_method_id, amount, currency, ipAddr } = CreateOrderDto;
        Optional.of(await PaymentMethodRepository.findById(payment_method_id))
            .throwIfNotPresent(
                new ErrorResponse(errorMessages.INVALID_SYNTAX, BAD_REQUEST, errorCodes.INVALID_SYNTAX, [
                    errorMessages.PAYMENT_METHOD_INVALID,
                ]));

        const { paymentUrl, vnpParams } = VnpayHelper.buildPaymentUrl(amount, currency, ipAddr);
        const orderData = {
            ...CreateOrderDto,
            payment_order_id: vnpParams.vnp_TxnRef,
            transaction_date: vnpParams.vnp_CreateDate,
        };
        const orderCreated = await OrderRepository.create(orderData);
        return { ...orderCreated, payment_url: paymentUrl };
    };

    static updateStatusOrder = async (payment_order_id, vnp_IpAddr) => {
        const order = await this.findOneBy('payment_order_id', payment_order_id);
        const transaction = await VnpayHelper.queryDr(payment_order_id, order.transaction_date, vnp_IpAddr);
        if (transaction?.vnp_TransactionStatus && transaction?.vnp_TransactionStatus === '00') {
            await OrderRepository.update({ id: order.id },
                { status: 'PAID' }
            );
            return { status: 'PAID' };
        }
        return { status: order.status };
    };
};

export default OrderService;