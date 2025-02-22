"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const ModelRouter_1 = require("./router/ModelRouter");
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
app.get('/', (req, res) => {
    res.send('Hello from server!');
});
app.use("/api/model", ModelRouter_1.modelRouter);
