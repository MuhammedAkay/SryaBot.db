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
exports.readJSON = readJSON;
exports.writeJSON = writeJSON;
exports.ensureDirectory = ensureDirectory;
const fs_1 = require("fs");
function readJSON(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fs_1.promises.readFile(filePath, "utf-8");
            return JSON.parse(data);
        }
        catch (error) {
            console.error(`JSON dosyası okunamadı: ${filePath}`, error);
            return {};
        }
    });
}
function writeJSON(filePath, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fs_1.promises.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
        }
        catch (error) {
            console.error(`JSON dosyasına yazılamadı: ${filePath}`, error);
        }
    });
}
function ensureDirectory(dirPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fs_1.promises.mkdir(dirPath, { recursive: true });
        }
        catch (error) {
            if (typeof error === "object" &&
                error !== null &&
                "code" in error &&
                error.code !== "EEXIST") {
                console.error("Klasör oluşturulurken bir hata oluştu:", error);
            }
        }
    });
}
