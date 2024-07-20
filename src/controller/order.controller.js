import { CreatedResponse, SuccessResponse } from '@/response/success.response.js';
import { OrderService } from '@/modules/order/service';
import { CreateOrderDto } from '@/modules/order/dto';

class OrderController {
    static createOrder = async (req, res) => {
        const ipAddr = req.ip;
        const { id: user_id } = req.user;
        const body = { ...req.body, ipAddr, user_id };
        new CreatedResponse({
            data: await OrderService.createOrder(CreateOrderDto(body)),
        }).send(res);
    };

    static updateOrder = async (req, res) => {
        const { payment_order_id } = req.params;
        const ipAddr = req.ip;
        new SuccessResponse({
            data: await OrderService.updateStatusOrder(payment_order_id, ipAddr),
        }).send(res);
    };

}
export default OrderController;
