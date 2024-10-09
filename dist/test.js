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
const SryaBotDB_1 = __importDefault(require("./SryaBotDB"));
const path_1 = __importDefault(require("path"));
const newDBPath = path_1.default.join(__dirname, "../database");
const oldDBPath = path_1.default.join(__dirname, "../db/oldData.json");
function runTests() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const db = new SryaBotDB_1.default({ name: "testData", dataDir: newDBPath });
        try {
            yield db.clear();
            console.log("Test 1: Veritabanı başlatma");
            yield db.set("item1", { name: "Kalem", price: 40, reviews: [] });
            yield db.set("comments", [
                { user: "Mehmet", comment: "Bu kitapta faydalı bilgiler var", rating: 5 },
            ]);
            yield db.set("balance", 1000);
            let balance = yield db.get("balance");
            if (balance !== 1000)
                throw new Error("balance 1000 olmalı.");
            console.log("Test 2: Veritabanına veri ekleme");
            yield db.set("users", {
                name: "Ali",
                age: 20,
                bankBalance: 1000,
                inventory: [
                    { name: "Kitap", price: 100 },
                    { name: "Kalem", price: 50 },
                ],
            });
            let user = yield db.get("users");
            if (!user || user.name !== "Ali")
                throw new Error("Ali adında kullanıcı bulunmalı.");
            console.log("Test 3: Veritabanı verisini güncelleme");
            yield db.update("users", { age: 21 });
            user = yield db.get("users");
            if (!user || user.age !== 21)
                throw new Error("Ali'nin yaşı 21 olmalı.");
            console.log("Test 4: Anahtar kontrolü");
            const hasUser1 = yield db.has("users");
            if (!hasUser1)
                throw new Error("'users' anahtarı bulunmalı.");
            console.log("Test 5: Diziye veri ekleme (push)");
            yield db.push("comments", {
                user: "Ali",
                comment: "Bu kalemin mürekkebi az",
                rating: 3,
            });
            const comments = yield db.get("comments");
            if (comments.length !== 2 || comments[1].user !== "Ali")
                throw new Error("Yorumlar dizisine Ali eklenmiş olmalı.");
            console.log("Test 6: Diziden veri çıkarma (unpush)");
            yield db.unpush("comments", {
                user: "Ali",
                comment: "Bu kalemin mürekkebi az",
                rating: 3,
            });
            const updatedComments = yield db.get("comments");
            if (updatedComments.find((comment) => comment.user === "Ali"))
                throw new Error("Ali yorumdan silinmiş olmalı.");
            console.log("Test 7: Sayısal veriyi artırma (add)");
            yield db.add("balance", 500);
            balance = yield db.get("balance");
            if (balance !== 1500)
                throw new Error("balance 1500 olmalı.");
            console.log("Test 8: Sayısal veriyi azaltma (subtract)");
            yield db.subtract("balance", 300);
            balance = yield db.get("balance");
            if (balance !== 1200)
                throw new Error("balance 1200 olmalı.");
            console.log("Test 9: Anahtar silme");
            yield db.delete("balance");
            balance = yield db.get("balance");
            if (balance !== undefined)
                throw new Error("balance silinmiş olmalı.");
            console.log("Test 10: JSON dosyasından veri transferi");
            yield db.transferFromJSON(oldDBPath);
            console.log("Transfer tamamlandı.");
            console.log("Test 11: Operate ile diziye eleman ekleme");
            yield db.operate("item1", { $push: { user: "Ali", review: "Harika!" } }, "reviews");
            const item1 = yield db.get("item1");
            if (!((_a = item1 === null || item1 === void 0 ? void 0 : item1.reviews) === null || _a === void 0 ? void 0 : _a.find((review) => review.user === "Ali" && review.review === "Harika!"))) {
                throw new Error("Ali'nin incelemesi reviews dizisine eklenmiş olmalı.");
            }
            console.log("Test 12: Operate ile dizi elemanı çıkarma");
            yield db.operate("item1", { $unpush: { user: "Ali", review: "Harika!" } }, "reviews");
            const item1Updated = yield db.get("item1");
            if ((_b = item1Updated === null || item1Updated === void 0 ? void 0 : item1Updated.reviews) === null || _b === void 0 ? void 0 : _b.find((review) => review.user === "Ali" && review.review === "Harika!")) {
                throw new Error("Ali'nin incelemesi reviews dizisinden silinmiş olmalı.");
            }
            console.log("Test 13: Operate ile sayısal veriyi artırma");
            yield db.operate("item1", { $add: 20 }, "price");
            const item1UpdatedPrice = yield db.get("item1");
            if ((item1UpdatedPrice === null || item1UpdatedPrice === void 0 ? void 0 : item1UpdatedPrice.price) !== 60)
                throw new Error("item1'in price değeri 60 olmalı.");
            console.log("Test 14: Operate ile sayısal veriyi azaltma");
            yield db.operate("item1", { $subtract: 10 }, "price");
            const item1FinalPrice = yield db.get("item1");
            if ((item1FinalPrice === null || item1FinalPrice === void 0 ? void 0 : item1FinalPrice.price) !== 50)
                throw new Error("item1'in price değeri 50 olmalı.");
            console.log("Test 15: Tüm veritabanını temizleme (clear)");
            yield db.clear();
            user = yield db.get("users");
            balance = yield db.get("balance");
            let item = yield db.get("item1");
            if (user !== undefined || balance !== undefined || item !== undefined)
                throw new Error("Tüm veritabanı temizlenmiş olmalı.");
            console.log("Tüm testler başarıyla tamamlandı.");
        }
        catch (error) {
            console.error(`Test hatası: ${error}`);
        }
    });
}
runTests().catch(console.error);
