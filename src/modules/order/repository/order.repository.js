import db from '@/database/models';

class OrderRepository {
    static findOneBy = async (column, value) => {
        const order = await db.Order.findOne({
            where: { [column]: value },
            include: [
                {
                    model: db.PaymentMethod,
                    require: true,
                    as: 'payment_method',
                },
            ],
            raw: true,
            nest: true,
        });

        return order;
    };

    static create = async (data) => {
        return await db.Order.create(data)
            .then((resultEntity) => resultEntity.get({ plain: true }));
    };

    static update = async (filter, data) => {
        const [numberOfAffectedRows, affectedRows] = await db.Order.update(data, {
            where: filter,
            returning: true,
        });

        if (numberOfAffectedRows === 1) {
            return affectedRows[0];
        }
        return null;
    };
};

export default OrderRepository;