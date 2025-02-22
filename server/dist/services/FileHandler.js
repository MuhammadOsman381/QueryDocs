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
exports.ReadPdfFile = exports.DeleteFile = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const DeleteFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const filepath = path_1.default.join(process.cwd(), "src", "public", "uploads", file);
    if (fs_1.default.existsSync(filepath)) {
        fs_1.default.unlink(filepath, (err) => {
            if (err) {
                return err;
            }
            else {
                return "File deleted succesfully";
            }
        });
    }
    else {
        return "File does not exist";
    }
});
exports.DeleteFile = DeleteFile;
const readFileAsync = (0, util_1.promisify)(fs_1.default.readFile);
/**
 * @param path
 * @returns
 */
const ReadPdfFile = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataBuffer = yield readFileAsync(path);
        const pdfData = yield (0, pdf_parse_1.default)(dataBuffer);
        return pdfData.text;
    }
    catch (error) {
        throw new Error(`Error processing PDF: ${error.message}`);
    }
});
exports.ReadPdfFile = ReadPdfFile;
