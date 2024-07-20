import db from '@/database/models';

class PaymentMethodRepository {
    static findById = async (id) => {
        return db.PaymentMethod.findByPk(id, { raw: true });
    };

    static getPaymentMethods = async () => {
        return db.PaymentMethod.findAll();
    };
};

export default PaymentMethodRepository;