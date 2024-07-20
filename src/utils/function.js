import 'dotenv/config';

const env = (envKey, defaultVal = null) => process.env[envKey] || defaultVal;

const sortObject = obj => {
    const sorted = {};
    const str = [];
    Object.keys(obj).forEach(key => {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    });

    str.sort();
    for (let key = 0; key < str.length; key += 1) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
};

export {
    env,
    sortObject
};
