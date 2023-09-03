"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendApiResponse = void 0;
const sendApiResponse = (res, data) => {
    res.status(data.statusCode).json({
        success: true,
        statusCode: data.statusCode,
        message: data.message,
        data: data.data,
        token: data.token
    });
};
exports.sendApiResponse = sendApiResponse;
