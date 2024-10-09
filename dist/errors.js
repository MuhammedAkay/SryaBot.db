"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseClearError = exports.SubtractOperationError = exports.UnpushOperationError = exports.PushOperationError = exports.AddOperationError = exports.KeyNotFoundError = exports.InvalidTypeError = exports.MissingDatabaseOptionError = void 0;
class MissingDatabaseOptionError extends Error {
    constructor(option) {
        super(`Gerekli veritabanı seçeneği eksik: ${option}`);
        this.name = "MissingDatabaseOptionError";
    }
}
exports.MissingDatabaseOptionError = MissingDatabaseOptionError;
class InvalidTypeError extends Error {
    constructor(key, beklenenTur) {
        super(`'${key}' anahtarı için geçersiz tür. Beklenen: ${beklenenTur}.`);
        this.name = "InvalidTypeError";
    }
}
exports.InvalidTypeError = InvalidTypeError;
class KeyNotFoundError extends Error {
    constructor(key) {
        super(`'${key}' anahtarı bulunamadı.`);
        this.name = "KeyNotFoundError";
    }
}
exports.KeyNotFoundError = KeyNotFoundError;
class AddOperationError extends Error {
    constructor(key) {
        super(`'${key}' anahtarı için ekleme işlemi başarısız. Bu bir sayı değil.`);
        this.name = "AddOperationError";
    }
}
exports.AddOperationError = AddOperationError;
class PushOperationError extends Error {
    constructor(key) {
        super(`'${key}' anahtarı için push işlemi başarısız. Bu bir dizi değil.`);
        this.name = "PushOperationError";
    }
}
exports.PushOperationError = PushOperationError;
class UnpushOperationError extends Error {
    constructor(key) {
        super(`'${key}' anahtarı için unpush işlemi başarısız. Bu bir dizi değil.`);
        this.name = "UnpushOperationError";
    }
}
exports.UnpushOperationError = UnpushOperationError;
class SubtractOperationError extends Error {
    constructor(key) {
        super(`'${key}' anahtarı için çıkarma işlemi başarısız. Bu bir sayı değil.`);
        this.name = "SubtractOperationError";
    }
}
exports.SubtractOperationError = SubtractOperationError;
class DatabaseClearError extends Error {
    constructor() {
        super("Veritabanı temizleme işlemi başarısız oldu.");
        this.name = "DatabaseClearError";
    }
}
exports.DatabaseClearError = DatabaseClearError;
