"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainModel = void 0;
const ApiResponseHandler_1 = require("../services/ApiResponseHandler");
const FileHandler_1 = require("../services/FileHandler");
const TrainModel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.files[0];
        const data = yield (0, FileHandler_1.ReadPdfFile)(file.path);
        console.log(data.trim());
        (0, ApiResponseHandler_1.ApiResponse)(res, true, 200, "Working fine!");
        (0, FileHandler_1.DeleteFile)(file.filename);
    }
    catch (error) {
        (0, ApiResponseHandler_1.ApiResponse)(res, false, 500, "There is something wrong!");
    }
});
exports.TrainModel = TrainModel;
