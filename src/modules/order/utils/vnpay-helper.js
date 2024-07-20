import appConfig from '@/config/app.config';
import querystring from 'qs';
import crypto from 'crypto';
import moment from 'moment';
import { sortObject } from '@/utils/function';
import { VnpBankCodeType, VnpLocale, VnpCurrCode } from '@/modules/order/enums';
import { v4 as uuidv4 } from 'uuid';
import { ErrorResponse } from '@/response/error.response';
import { QUERY_DR_RESPONSE_MAP } from '@/modules/order/constants';
import { errorCodes, errorMessages } from '@/response/httpResponse';
import { BAD_REQUEST, PAYMENT_REQUIRED } from 'http-status';
import { checkValidValue, getResponseByStatusCode } from './common';

const { payment: { vnp_TmnCode, vnp_HashSecret, vnp_Url, vnp_Api, vnp_ReturnUrl } } = appConfig;

class VnpayHelper {

    static buildPaymentUrl = (amount, currency, ipAddr) => {
        if (!checkValidValue(VnpCurrCode, currency)) {
            throw new ErrorResponse(errorMessages.CURRENCY_NOT_EXIST, BAD_REQUEST, errorCodes.CURRENCY_NOT_EXIST);
        }
        process.env.TZ = 'Asia/Ho_Chi_Minh';

        const date = new Date();
        const createDate = moment(date).format('YYYYMMDDHHmmss');

        let vnpUrl = vnp_Url;
        const orderId = uuidv4();

        const locale = 'vn';
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = vnp_TmnCode;
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currency || 'VND';
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = vnp_ReturnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        vnp_Params['vnp_BankCode'] = VnpBankCodeType.VNBANK;

        vnp_Params = sortObject(vnp_Params);
        let signData = querystring.stringify(vnp_Params, { encode: false });

        let hmac = crypto.createHmac("sha512", vnp_HashSecret);
        let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
        return { paymentUrl: vnpUrl, vnpParams: vnp_Params };
    };

    static queryDr = async (vnp_TxnRef, vnp_TransactionDate, vnp_IpAddr) => {
        process.env.TZ = 'Asia/Ho_Chi_Minh';
        const date = new Date();

        const vnp_RequestId = uuidv4();
        const vnp_Version = '2.1.0';
        const vnp_Command = 'querydr';
        const vnp_OrderInfo = 'Truy van GD ma:' + vnp_TxnRef;

        const vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');

        const data = vnp_RequestId + "|" + vnp_Version + "|" + vnp_Command + "|" + vnp_TmnCode + "|" + vnp_TxnRef + "|" + vnp_TransactionDate + "|" + vnp_CreateDate + "|" + vnp_IpAddr + "|" + vnp_OrderInfo;

        const hmac = crypto.createHmac("sha512", vnp_HashSecret);
        const vnp_SecureHash = hmac.update(Buffer.from(data, 'utf-8')).digest("hex");

        const dataObj = {
            vnp_RequestId: vnp_RequestId,
            vnp_Version: vnp_Version,
            vnp_Command: vnp_Command,
            vnp_TmnCode: vnp_TmnCode,
            vnp_TxnRef: vnp_TxnRef,
            vnp_OrderInfo: vnp_OrderInfo,
            vnp_TransactionDate: vnp_TransactionDate,
            vnp_CreateDate: vnp_CreateDate,
            vnp_IpAddr: vnp_IpAddr,
            vnp_SecureHash: vnp_SecureHash,
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataObj),
        }

        const response = await fetch(vnp_Api, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = (await response.json());
        if (responseData.vnp_ResponseCode !== '00') {
            const message = getResponseByStatusCode(responseData.vnp_ResponseCode, VnpLocale.VN, QUERY_DR_RESPONSE_MAP);
            throw new ErrorResponse(message, PAYMENT_REQUIRED, errorCodes.TRANSACTION_ERROR);
        }
        return responseData;
    };
}

export default VnpayHelper;