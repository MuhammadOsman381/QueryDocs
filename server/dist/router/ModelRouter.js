"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelRouter = void 0;
const express_1 = __importDefault(require("express"));
const FileController_1 = require("../controller/FileController");
const Multer_1 = require("../middleware/Multer");
const modelRouter = express_1.default.Router();
exports.modelRouter = modelRouter;
modelRouter.post("/train-model", Multer_1.uploadArray, FileController_1.TrainModel);
