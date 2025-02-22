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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMulterError = exports.attachStringFile = exports.uploadArray = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path_1.default.join(process.cwd(), "src", "public", "uploads");
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9_.-]/g, "_");
        const timestamp = Date.now();
        cb(null, `${timestamp}-${sanitizedName}`);
    },
});
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 },
});
exports.uploadArray = upload.array("file", 5);
const attachStringFile = (req, res, next) => {
    if ((!req.files || (Array.isArray(req.files) && req.files.length === 0)) && req.body.file) {
        req.files = req.body.file;
    }
    next();
};
exports.attachStringFile = attachStringFile;
const handleMulterError = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (err instanceof multer_1.default.MulterError) {
        res.status(400).json({ error: err.message });
        return;
    }
    if (err) {
        res.status(400).json({ error: err.message });
        return;
    }
    next();
});
exports.handleMulterError = handleMulterError;
