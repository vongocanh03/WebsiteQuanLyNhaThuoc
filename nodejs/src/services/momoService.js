const crypto = require('crypto');
const https = require('https');
import momoConfig from '../config/momoconfig';

const createPaymentRequest = (amount, orderInfo) => {
    const orderId = momoConfig.partnerCode + new Date().getTime();
    const requestId = orderId;
    const rawSignature = `accessKey=${momoConfig.accessKey}&amount=${amount}&extraData=&ipnUrl=${momoConfig.ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${momoConfig.partnerCode}&redirectUrl=${momoConfig.redirectUrl}&requestId=${requestId}&requestType=captureWallet`;

    const signature = crypto.createHmac('sha256', momoConfig.secretKey)
        .update(rawSignature)
        .digest('hex');

    const requestBody = JSON.stringify({
        partnerCode: momoConfig.partnerCode,
        partnerName: "MoMo Payment",
        storeId: "MoMoTestStore",
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: momoConfig.redirectUrl,
        ipnUrl: momoConfig.ipnUrl,
        requestType: "captureWallet",
        signature: signature,
        extraData: ""
    });

    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'test-payment.momo.vn',
            port: 443,
            path: '/v2/gateway/api/create',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody)
            }
        };

        const req = https.request(options, (res) => {
            res.setEncoding('utf8');
            let responseData = '';
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            res.on('end', () => {
                resolve(JSON.parse(responseData));
            });
        });

        req.on('error', (e) => {
            reject(e);
        });

        req.write(requestBody);
        req.end();
    });
};

module.exports = {
    createPaymentRequest
};
