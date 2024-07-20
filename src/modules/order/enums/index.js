export const HashAlgorithm = Object.freeze({
    SHA256: 'SHA256',
    SHA512: 'SHA512',
    MD5: 'MD5',
});

export const VnpCurrCode = Object.freeze({
    VND: 'VND',
});

export const VnpBankCodeType = Object.freeze({
    VNPAYQR: 'VNPAYQR',
    VNBANK: 'VNBANK',
    INTCARD: 'INTCARD',
});

export const VnpLocale = Object.freeze({
    VN: 'vn',
    EN: 'en',
});

export const VnpTransactionType = Object.freeze({
    PAYMENT: '01',
    FULL_REFUND: '02',
    PARTIAL_REFUND: '03',
});

export const RefundTransactionType = Object.freeze({
    FULL_REFUND: '02',
    PARTIAL_REFUND: '03',
});
