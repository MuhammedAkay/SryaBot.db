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
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
const errors_1 = require("./errors");
class SryaBotDB {
    constructor(options) {
        if (!options.name) {
            throw new errors_1.MissingDatabaseOptionError("name");
        }
        if (!options.dataDir) {
            throw new errors_1.MissingDatabaseOptionError("dataDir");
        }
        this.filePath = path_1.default.join(options.dataDir, `${options.name}.json`);
        this.initializeDatabase();
    }
    initializeDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, utils_1.ensureDirectory)(path_1.default.dirname(this.filePath));
                yield fs_1.promises.access(this.filePath);
            }
            catch (_a) {
                yield fs_1.promises.writeFile(this.filePath, "{}", "utf-8");
                console.log(`Veritabanı dosyası oluşturuldu: ${this.filePath}`);
            }
        });
    }
    /**
     * Veritabanına yeni bir anahtar-değer çifti ekler veya mevcut anahtarın verisini günceller.
     *
     * - Mevcut anahtarın değeri tamamen değiştirilir.
     * - Anahtar, veritabanındaki benzersiz bir anahtar olmalıdır.
     * - Değerin türü, mevcut verinin türü ile uyumlu olmalıdır.
     *
     * @param {K} key - Eklenecek veya güncellenecek anahtar. Bu anahtar veritabanındaki bir kaydı temsil eder.
     * @param {T[K]} value - Anahtara atanacak değer. Bu değer, anahtara ait veriyi temsil eder.
     *
     * @example
     * await db.set('user123', { name: 'Ali', age: 30, inventory: [] }); // 'user123' anahtarına bir nesne eklenir.
     */
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, utils_1.readJSON)(this.filePath);
            data[key] = value;
            yield (0, utils_1.writeJSON)(this.filePath, data);
        });
    }
    /**
     * Belirtilen anahtara karşılık gelen veriyi döner.
     *
     * - Eğer anahtar veritabanında mevcut değilse `undefined` döner.
     * - Kullanıcı, bu fonksiyonu belirli bir anahtarın değerini almak için kullanabilir.
     *
     * @param {K} key - Erişilmek istenen anahtar. Bu anahtar, veritabanında mevcut olmalıdır.
     * @returns {Promise<T[K] | undefined>} - Anahtarın karşılık geldiği değer veya undefined.
     *
     * @example
     * const item = await db.get('item1'); // 'item1' anahtarına ait veriyi döner.
     */
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, utils_1.readJSON)(this.filePath);
            return data[key];
        });
    }
    /**
     * Mevcut anahtarın verisini kısmen günceller, mevcut veriyi korur.
     *
     * - Yalnızca belirtilen alanlar güncellenir, diğer veriler korunur.
     * - Anahtarın mevcut olması durumunda yeni değerler eski verilerle birleştirilir.
     *
     * @param {K} key - Güncellenecek anahtar. Bu anahtar veritabanında mevcut olmalıdır.
     * @param {Partial<T[K]>} newData - Güncellenmesi istenen veri parçası. Bu nesne, anahtarın mevcut verisini güncellemek için kullanılır.
     *
     * @example
     * await db.update('user123', { age: 31 }); // 'user123' anahtarına ait yaş bilgisi güncellenir.
     */
    update(key, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, utils_1.readJSON)(this.filePath);
            if (!data[key]) {
                throw new errors_1.KeyNotFoundError(String(key));
            }
            data[key] = Object.assign(Object.assign({}, data[key]), newData);
            yield (0, utils_1.writeJSON)(this.filePath, data);
        });
    }
    /**
     * Belirtilen anahtarı ve karşılık gelen değeri veritabanından siler.
     *
     * - Eğer anahtar veritabanında mevcut değilse hata fırlatılır.
     * - Bu fonksiyon, kullanıcıların veritabanındaki gereksiz veya eski verileri temizlemelerine olanak tanır.
     *
     * @param {K} key - Silinmek istenen anahtar. Bu anahtar, veritabanında mevcut olmalıdır.
     *
     * @example
     * await db.delete('item1'); // 'item1' anahtarı ve onun değerini veritabanından siler.
     */
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, utils_1.readJSON)(this.filePath);
            if (!data[key]) {
                throw new errors_1.KeyNotFoundError(String(key));
            }
            delete data[key];
            yield (0, utils_1.writeJSON)(this.filePath, data);
        });
    }
    /**
     * Veritabanındaki tüm verileri temizler.
     *
     * - Bu fonksiyon, veritabanı dosyasına boş bir içerik yazarak tüm verileri siler.
     * - Eğer bir hata oluşursa, bu hata error.ts dosyasındaki hata yönetimi ile ele alınmalıdır.
     *
     * @example
     * await db.clear(); // Veritabanını tamamen temizler.
     *
     * @throws {DatabaseClearError} Veritabanı temizleme işlemi sırasında bir hata oluşursa.
     */
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs_1.promises.writeFile(this.filePath, JSON.stringify({}));
            }
            catch (error) {
                throw new errors_1.DatabaseClearError();
            }
        });
    }
    /**
     * Belirtilen anahtarın değerine yeni bir eleman ekler (diziye veri ekleme).
     *
     * - Anahtarın değeri bir dizi olmalıdır, aksi halde hata fırlatılır.
     *
     * @param {K} key - Dizinin bulunduğu anahtar. Dizi olmayan bir anahtar verilirse hata alınır.
     * @param {T[K] extends Array<infer U> ? U : never} value - Eklenmesi istenen değer. Bu değer, dizinin sonuna eklenir.
     *
     * @example
     * await db.push('comments', { userId: 'user123', rating: 5, comment: 'Harika!' }); // 'comments' dizisine yeni bir yorum ekler.
     */
    push(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, utils_1.readJSON)(this.filePath);
            if (!Array.isArray(data[key])) {
                throw new errors_1.PushOperationError(String(key));
            }
            data[key].push(value);
            yield (0, utils_1.writeJSON)(this.filePath, data);
        });
    }
    /**
     * Diziden belirtilen değeri çıkarır.
     *
     * - Eğer anahtarın değeri bir dizi değilse hata fırlatılır.
     * - Eğer değer dizide yoksa hiçbir işlem yapılmaz.
     *
     * @param {K} key - Elemanın çıkarılacağı dizinin bulunduğu anahtar. Bu anahtarın bir dizi olması gerekmektedir.
     * @param {T[K] extends Array<infer U> ? U : never} value - Diziden çıkarılacak değer. Bu değer, dizide aranır ve varsa çıkarılır.
     *
     * @example
     * await db.unpush('comments', { userId: 'user123', rating: 5, comment: 'Harika!' }); // 'comments' dizisinden belirtilen yorumu çıkarır.
     */
    unpush(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, utils_1.readJSON)(this.filePath);
            if (!Array.isArray(data[key])) {
                throw new errors_1.UnpushOperationError(String(key));
            }
            const index = data[key].findIndex((item) => JSON.stringify(item) === JSON.stringify(value));
            if (index > -1) {
                data[key].splice(index, 1);
            }
            yield (0, utils_1.writeJSON)(this.filePath, data);
        });
    }
    /**
     * Belirtilen anahtarın sayısal değerine ekleme yapar.
     *
     * - Eğer anahtarın değeri tanımlı değilse veya bir sayı değilse hata fırlatılır.
     *
     * @param {K} key - Sayısal değerin bulunduğu anahtar. Bu anahtar, sayısal bir değer içermelidir.
     * @param {number} value - Eklenmesi istenen sayı. Bu değer, anahtarın mevcut değerine eklenir.
     *
     * @example
     * await db.add('keys', 1); // 'keys' anahtarının değerini 1 artırır.
     */
    add(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, utils_1.readJSON)(this.filePath);
            if (data[key] === undefined || typeof data[key] !== "number") {
                throw new errors_1.AddOperationError(String(key));
            }
            data[key] = (data[key] + value);
            yield (0, utils_1.writeJSON)(this.filePath, data);
        });
    }
    /**
     * Belirtilen anahtarın sayısal değerinden çıkarma yapar.
     *
     * - Eğer anahtarın değeri tanımlı değilse veya bir sayı değilse hata fırlatılır.
     * - Çıkarma işlemi, belirtilen değeri anahtarın mevcut değerinden çıkararak günceller.
     *
     * @param {K} key - Sayısal değerin bulunduğu anahtar. Bu anahtar, sayısal bir değer içermelidir.
     * @param {number} value - Çıkarılması istenen sayı. Bu değer, anahtarın mevcut değerinden çıkarılır.
     *
     * @example
     * await db.subtract('keys', 1); // 'keys' anahtarının değerinden 1 çıkarılır.
     */
    subtract(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, utils_1.readJSON)(this.filePath);
            if (data[key] === undefined || typeof data[key] !== "number") {
                throw new errors_1.SubtractOperationError(String(key));
            }
            data[key] = (data[key] - value);
            yield (0, utils_1.writeJSON)(this.filePath, data);
        });
    }
    /**
     * Belirtilen bir JSON dosyasındaki verileri mevcut veritabanına transfer eder.
     *
     * - Eğer transfer edilen veriler diziyse, mevcut dizilerle birleştirilir.
     * - Eğer veriler nesneyse, mevcut nesnelerle derinlemesine birleştirme yapılır.
     * - Veri tipi uyumsuzsa, ilgili anahtar atlanır ve uyarı verilir.
     *
     * @param {string} sourceFilePath - Transfer edilecek JSON dosyasının yolu. Bu dosya, eski veritabanını temsil eder.
     *
     * @example
     * await db.transferFromJSON('./eskiVeritabani.json'); // Eski veritabanı dosyasındaki verileri mevcut veritabanına aktarır.
     */
    transferFromJSON(sourceFilePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sourceData = yield (0, utils_1.readJSON)(sourceFilePath);
                const currentData = yield (0, utils_1.readJSON)(this.filePath);
                for (const [key, value] of Object.entries(sourceData)) {
                    if (!(key in currentData)) {
                        currentData[key] = value;
                        continue;
                    }
                    if (Array.isArray(value) && Array.isArray(currentData[key])) {
                        currentData[key] = [...currentData[key], ...value];
                    }
                    else if (typeof value === "object" &&
                        typeof currentData[key] === "object") {
                        currentData[key] = Object.assign(Object.assign({}, currentData[key]), value);
                    }
                    else {
                        console.warn(`Uyarı: ${key} anahtarı için veri türleri uyuşmuyor. Atlanacak.`);
                    }
                }
                yield (0, utils_1.writeJSON)(this.filePath, currentData);
                console.log(`Veriler başarıyla transfer edildi: ${sourceFilePath}`);
            }
            catch (error) {
                console.error(`Veri transferi sırasında hata oluştu: ${error}`);
                throw error;
            }
        });
    }
    /**
     * Genel bir işlem fonksiyonu sağlar ($push, $unpush, $add, $subtract).
     *
     * - Belirtilen anahtar ve isteğe bağlı alt anahtar (subkey) üzerinde çeşitli işlemler yapar.
     * - $push: Dizinin sonuna eleman ekler.
     * - $unpush: Diziden eleman çıkarır.
     * - $add: Sayısal değeri artırır.
     * - $subtract: Sayısal değeri azaltır.
     *
     * @param {string} key - İşlemin yapılacağı anahtar. Bu anahtar, veritabanında mevcut olmalıdır.
     * @param {object} operation - Yapılacak işlemi belirten nesne. (Örneğin: { $push: {...} }).
     * @param {string} [subkey] - (İsteğe bağlı) Alt anahtar, eğer anahtarın içinde alt bir nesne varsa kullanılır.
     *
     * @example
     * await db.operate('item1', { $push: { user: 'Ali', review: 'Harika!' } }, 'reviews'); // 'reviews' dizisine eleman ekler.
     */
    operate(key, operation, subkey) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, utils_1.readJSON)(this.filePath);
            if (!data[key]) {
                throw new errors_1.KeyNotFoundError(key);
            }
            let target = data[key];
            if (subkey) {
                if (!target[subkey]) {
                    throw new errors_1.KeyNotFoundError(subkey);
                }
                target = target[subkey];
            }
            if (operation.$push) {
                if (!Array.isArray(target)) {
                    throw new errors_1.PushOperationError(String(subkey || key));
                }
                target.push(operation.$push);
            }
            if (operation.$unpush) {
                if (!Array.isArray(target)) {
                    throw new errors_1.UnpushOperationError(String(subkey || key));
                }
                // Nesne aramak için, elemanın kullanıcı ve inceleme özelliklerine göre kontrol edelim.
                const { user, review } = operation.$unpush;
                const index = target.findIndex((item) => item.user === user && item.review === review);
                if (index > -1) {
                    target.splice(index, 1);
                }
            }
            if (operation.$add !== undefined) {
                if (typeof target !== "number") {
                    throw new errors_1.AddOperationError(String(subkey || key));
                }
                target += operation.$add;
            }
            if (operation.$subtract !== undefined) {
                if (typeof target !== "number") {
                    throw new errors_1.SubtractOperationError(String(subkey || key));
                }
                target -= operation.$subtract;
            }
            if (subkey) {
                data[key][subkey] = target;
            }
            else {
                data[key] = target;
            }
            yield (0, utils_1.writeJSON)(this.filePath, data);
        });
    }
    /**
     * Veritabanında belirtilen anahtara ait olan array içindeki elemanları verilen koşula göre arar.
     *
     * - Array içinde koşulu sağlayan ilk elemanı döner.
     * - Eğer koşulu sağlayan bir eleman yoksa `undefined` döner.
     *
     * @param {string} key - İçinde arama yapılacak anahtar. Bu anahtarın veritabanındaki karşılığı bir array olmalıdır.
     * @param {(item: any) => boolean} predicate - Array içinde uygulanacak koşul. Her bir eleman üzerinde çalışır.
     * @returns {Promise<any | undefined>} - Koşulu sağlayan ilk eleman veya eşleşme yoksa `undefined`.
     *
     * @example
     * const result = await db.find('users', user => user.age > 18);
     * // 'users' anahtarına ait array içinde yaşı 18'den büyük olan ilk kullanıcıyı bulur ve döner.
     *
     * @example
     * const result = await db.find('orders', order => order.status === 'delivered');
     * // 'orders' anahtarına ait array içinde durumu 'delivered' olan ilk siparişi bulur ve döner.
     */
    find(key, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.get(key);
            if (Array.isArray(data)) {
                return data.find(predicate);
            }
            return undefined;
        });
    }
    /**
     * Veritabanında belirtilen anahtarın olup olmadığını kontrol eder.
     *
     * - Anahtar veritabanında mevcutsa true, değilse false döner.
     *
     * @param {K} key - Kontrol edilecek anahtar. Bu anahtarın veritabanında mevcut olup olmadığını kontrol eder.
     * @returns {Promise<boolean>} - Anahtarın olup olmadığını belirten boolean değer.
     *
     * @example
     * const exists = await db.has('user123'); // 'user123' anahtarının veritabanında olup olmadığını kontrol eder.
     */
    has(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, utils_1.readJSON)(this.filePath);
            return Object.prototype.hasOwnProperty.call(data, key);
        });
    }
    /**
     * Veritabanındaki tüm kayıtları döner.
     *
     * - Veritabanında bulunan tüm anahtar-değer çiftlerini bir nesne olarak döner.
     * - Bu fonksiyon, kullanıcıların tüm verilerini topluca görmelerine olanak tanır.
     *
     * @returns {Promise<T>} - Veritabanındaki tüm kayıtlar.
     *
     * @example
     * const allData = await db.getAll(); // Veritabanındaki tüm veriyi döner.
     */
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, utils_1.readJSON)(this.filePath);
        });
    }
}
exports.default = SryaBotDB;
