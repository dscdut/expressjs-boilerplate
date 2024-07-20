export const CreateOrderDto = (body) => ({
    user_id: body.user_id,
    customer_name: body.customer_name,
    customer_phone: body.customer_phone,
    payment_method_id: body.payment_method_id,
    amount: body.price,
    currency: body.currency,
    ipAddr: body.ipAddr,
});
