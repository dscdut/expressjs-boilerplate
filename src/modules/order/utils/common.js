import { VnpLocale } from '@/modules/order/enums';
import { RESPONSE_MAP } from '@/modules/order/constants';

export const getResponseByStatusCode = (responseCode, locale = VnpLocale.VN, responseMap = RESPONSE_MAP) => {
    const respondText =
        responseMap[responseCode] ?? responseMap['default'];

    return respondText[locale];
};

export const checkValidValue = (obj, value) => Object.values(obj).includes(value);
