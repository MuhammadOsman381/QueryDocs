"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
const ApiResponse = (res, success, status, message, data = null) => {
    return res.status(status).json({
        success: success,
        message: message,
        data: data
    });
};
exports.ApiResponse = ApiResponse;
