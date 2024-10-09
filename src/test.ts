import SryaBotDB from "./SryaBotDB";
import path from "path";

const newDBPath = path.join(__dirname, "../database");
const oldDBPath = path.join(__dirname, "../db/oldData.json");

async function runTests() {
  const db = new SryaBotDB({ name: "testData", dataDir: newDBPath });

  try {
    await db.clear();

    console.log("Test 1: Veritabanı başlatma");
    await db.set("item1", { name: "Kalem", price: 40, reviews: [] });
    await db.set("comments", [
      { user: "Mehmet", comment: "Bu kitapta faydalı bilgiler var", rating: 5 },
    ]);
    await db.set("balance", 1000);
    let balance = await db.get("balance");
    if (balance !== 1000) throw new Error("balance 1000 olmalı.");

    console.log("Test 2: Veritabanına veri ekleme");
    await db.set("users", {
      name: "Ali",
      age: 20,
      bankBalance: 1000,
      inventory: [
        { name: "Kitap", price: 100 },
        { name: "Kalem", price: 50 },
      ],
    });
    let user = await db.get("users");
    if (!user || user.name !== "Ali")
      throw new Error("Ali adında kullanıcı bulunmalı.");

    console.log("Test 3: Veritabanı verisini güncelleme");
    await db.update("users", { age: 21 });
    user = await db.get("users");
    if (!user || user.age !== 21) throw new Error("Ali'nin yaşı 21 olmalı.");

    console.log("Test 4: Anahtar kontrolü");
    const hasUser1 = await db.has("users");
    if (!hasUser1) throw new Error("'users' anahtarı bulunmalı.");

    console.log("Test 5: Diziye veri ekleme (push)");
    await db.push("comments", {
      user: "Ali",
      comment: "Bu kalemin mürekkebi az",
      rating: 3,
    });
    const comments = await db.get("comments");
    if (comments.length !== 2 || comments[1].user !== "Ali")
      throw new Error("Yorumlar dizisine Ali eklenmiş olmalı.");

    console.log("Test 6: Diziden veri çıkarma (unpush)");
    await db.unpush("comments", {
      user: "Ali",
      comment: "Bu kalemin mürekkebi az",
      rating: 3,
    });
    const updatedComments = await db.get("comments");
    if (updatedComments.find((comment: any) => comment.user === "Ali"))
      throw new Error("Ali yorumdan silinmiş olmalı.");

    console.log("Test 7: Sayısal veriyi artırma (add)");
    await db.add("balance", 500);
    balance = await db.get("balance");
    if (balance !== 1500) throw new Error("balance 1500 olmalı.");

    console.log("Test 8: Sayısal veriyi azaltma (subtract)");
    await db.subtract("balance", 300);
    balance = await db.get("balance");
    if (balance !== 1200) throw new Error("balance 1200 olmalı.");

    console.log("Test 9: Anahtar silme");
    await db.delete("balance");
    balance = await db.get("balance");
    if (balance !== undefined) throw new Error("balance silinmiş olmalı.");

    console.log("Test 10: JSON dosyasından veri transferi");
    await db.transferFromJSON(oldDBPath);
    console.log("Transfer tamamlandı.");

    console.log("Test 11: Operate ile diziye eleman ekleme");
    await db.operate(
      "item1",
      { $push: { user: "Ali", review: "Harika!" } },
      "reviews"
    );
    const item1 = await db.get("item1");
    if (
      !item1?.reviews?.find(
        (review: any) => review.user === "Ali" && review.review === "Harika!"
      )
    ) {
      throw new Error("Ali'nin incelemesi reviews dizisine eklenmiş olmalı.");
    }

    console.log("Test 12: Operate ile dizi elemanı çıkarma");
    await db.operate(
      "item1",
      { $unpush: { user: "Ali", review: "Harika!" } },
      "reviews"
    );
    const item1Updated = await db.get("item1");
    if (
      item1Updated?.reviews?.find(
        (review: any) => review.user === "Ali" && review.review === "Harika!"
      )
    ) {
      throw new Error("Ali'nin incelemesi reviews dizisinden silinmiş olmalı.");
    }

    console.log("Test 13: Operate ile sayısal veriyi artırma");
    await db.operate("item1", { $add: 20 }, "price");
    const item1UpdatedPrice = await db.get("item1");
    if (item1UpdatedPrice?.price !== 60)
      throw new Error("item1'in price değeri 60 olmalı.");

    console.log("Test 14: Operate ile sayısal veriyi azaltma");
    await db.operate("item1", { $subtract: 10 }, "price");
    const item1FinalPrice = await db.get("item1");
    if (item1FinalPrice?.price !== 50)
      throw new Error("item1'in price değeri 50 olmalı.");

    console.log("Test 15: Tüm veritabanını temizleme (clear)");
    await db.clear();
    user = await db.get("users");
    balance = await db.get("balance");
    let item = await db.get("item1");
    if (user !== undefined || balance !== undefined || item !== undefined)
      throw new Error("Tüm veritabanı temizlenmiş olmalı.");

    console.log("Tüm testler başarıyla tamamlandı.");
  } catch (error) {
    console.error(`Test hatası: ${error}`);
  }
}

runTests().catch(console.error);
