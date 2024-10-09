"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDB = void 0;
const SryaBotDB_1 = __importDefault(require("./SryaBotDB"));
exports.CreateDB = SryaBotDB_1.default;
exports.default = SryaBotDB_1.default;
if (typeof module !== "undefined") {
    module.exports = { CreateDB: SryaBotDB_1.default };
    module.exports.default = SryaBotDB_1.default;
}
