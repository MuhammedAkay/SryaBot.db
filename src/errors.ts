export class MissingDatabaseOptionError extends Error {
  constructor(option: string) {
    super(`Gerekli veritabanı seçeneği eksik: ${option}`);
    this.name = "MissingDatabaseOptionError";
  }
}

export class InvalidTypeError extends Error {
  constructor(key: string, beklenenTur: string) {
    super(`'${key}' anahtarı için geçersiz tür. Beklenen: ${beklenenTur}.`);
    this.name = "InvalidTypeError";
  }
}

export class KeyNotFoundError extends Error {
  constructor(key: string) {
    super(`'${key}' anahtarı bulunamadı.`);
    this.name = "KeyNotFoundError";
  }
}

export class AddOperationError extends Error {
  constructor(key: string) {
    super(`'${key}' anahtarı için ekleme işlemi başarısız. Bu bir sayı değil.`);
    this.name = "AddOperationError";
  }
}

export class PushOperationError extends Error {
  constructor(key: string) {
    super(`'${key}' anahtarı için push işlemi başarısız. Bu bir dizi değil.`);
    this.name = "PushOperationError";
  }
}

export class UnpushOperationError extends Error {
  constructor(key: string) {
    super(`'${key}' anahtarı için unpush işlemi başarısız. Bu bir dizi değil.`);
    this.name = "UnpushOperationError";
  }
}

export class SubtractOperationError extends Error {
  constructor(key: string) {
    super(
      `'${key}' anahtarı için çıkarma işlemi başarısız. Bu bir sayı değil.`
    );
    this.name = "SubtractOperationError";
  }
}

export class DatabaseClearError extends Error {
  constructor() {
    super("Veritabanı temizleme işlemi başarısız oldu.");
    this.name = "DatabaseClearError";
  }
}
