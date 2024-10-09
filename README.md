# SryaBot DB
SryaBot DB, Discord botları için güçlü ve esnek bir veritabanı yönetim sistemi sağlar. Bu kütüphane, JSON tabanlı ve CommonJS modül yapısında olup, basit veritabanı işlemleri için kullanıma hazırdır.

## Özellikler
- Anahtar-Değer Veritabanı
- Dizi (Array) İşlemleri
- Sayısal İşlemler
- Hata Yönetimi
- Esnek ve Kullanıcı Dostu API

## Kurulum
NPM üzerinden modülü yükleme:
```bash
npm install MuhammedAkay/SryaBot.db
```
package.json dosyasıyla ekleme:
```json
"dependencies": {
  "sryabot.db": "MuhammedAkay/SryaBot.db"
}
```
## Kullanım
Aşağıda modüldeki tüm fonksiyonların kullanımına dair örnekler yer almaktadır.
### Veritabanı Oluşturma
```js
const { CreateDB } = require("sryabot.db");

const db = new CreateDB({
  name: "myDatabase", // Veritabanı adı
  dataDir: "./data"    // Verilerin saklanacağı dizin
});
```
---
### Veri Ekleme/Güncelleme (set)
Veritabanına yeni bir kayıt ekler veya mevcut bir kaydı günceller.
#### Kullanım:
```js
await db.set('user1', { name: 'Ali', age: 28, balance: 1500 });
```
#### Açıklama:
- **set(key: string, value: any):**
 Veritabanına belirtilen anahtar ile veriyi kaydeder. Eğer anahtar daha önce kullanılmışsa, değeri günceller.
---
### Veri Alma (get)
Belirli bir anahtarın değerini almak için get metodunu kullanabilirsiniz:
#### Kullanım:
```js
const data = await db.get('user1');
```
#### Açıklama:
- **get(key: string):** Veritabanında belirtilen anahtara karşılık gelen değer döner. Eğer anahtar mevcut değilse, null döner.
---
### Belirli Anahtarın Varlığını Kontrol Etme (has)
Bir anahtarın veritabanında mevcut olup olmadığını kontrol etmek için has metodunu kullanabilirsiniz:
#### Kullanım:
```js
const exists = await db.has('user1');
```
#### Açıklama:
- **has(key: string):** Veritabanında belirtilen anahtarın mevcut olup olmadığını kontrol eder. true veya false döner.
---
### Veri Güncelleme (update)
Veritabanındaki bir kaydı güncellemek için update fonksiyonunu kullanabilirsiniz:
### Kullanım:
```js
await db.update('user1', { age: 29 });
```
#### Açıklama:
- **update(key: string, value: any):** Mevcut anahtara karşılık gelen veriyi günceller. Anahtar mevcut değilse, bir hata fırlatabilir veya işlem yapılmaz.
---
### Veri Silme (delete)
Belirli bir anahtarı silmek için delete fonksiyonunu kullanabilirsiniz:
#### Kullanım:
```js
await db.delete('user1');
```
#### Açıklama:
- **delete(key: string):** Veritabanından belirtilen anahtara karşılık gelen veriyi siler. Eğer anahtar mevcut değilse, işlem hiçbir etkisi olmaz.
---
### Diziye Veri Ekleme (push)
Veritabanında bir dizinin içine veri eklemek için push metodunu kullanabilirsiniz:
#### Kullanım:
```js
await db.push('bank', { userId: 'user2', balance: 1600 });
```
#### Açıklama:
- **push(key: string, value: any):** Belirtilen anahtarın değerinin bir dizi olmasını bekler. Eğer anahtar bir dizi değilse, PushOperationError hatası fırlatır.
---
### Diziden Veri Silme (unpush)
Bir diziden belirli bir öğeyi çıkarmak için unpush metodunu kullanabilirsiniz:
#### Kullanım:
```js
await db.unpush('bank', { userId: 'user2', balance: 1600 });
```
#### Açıklama:
- **unpush(key: string, value: any):** Belirtilen anahtarın değerinin bir dizi olmasını bekler. Eğer anahtar bir dizi değilse, UnpushOperationError hatası fırlatır.
---
### Sayısal Değer Artırma (add)
Belirli bir sayısal anahtarın değerini artırmak için add metodunu kullanabilirsiniz:
#### Kullanım:
```js
await db.add('balance', 100);
```
#### Açıklama:
- **add(key: string, value: number):** Belirtilen anahtarın değerinin bir sayısal olmasını bekler. Eğer anahtar mevcut değilse, hata fırlatır.
---
### Sayısal Değer Azaltma (subtract)
Bir sayısal değeri azaltmak için subtract metodunu kullanabilirsiniz:
#### Kullanım:
```js
await db.subtract('balance', 50);
```
#### Açıklama:
- **subtract(key: string, value: number):** Belirtilen anahtarın değerinin bir sayısal olmasını bekler. Eğer anahtar mevcut değilse, hata fırlatır.
---
### Veri Bulma (find)
Veritabanında belirli bir koşula uyan verileri bulur.
#### Kullanım:
```js
const result = await db.find((data) => data.age > 25);
```
#### Açıklama:
- **find(callback: function):** Veritabanında belirtilen koşula göre arama yapar.
  - **callback:** Her bir veri için çalıştırılan ve koşulu belirleyen fonksiyon. Koşulun doğru olduğu veriler döndürülür.
---
### JSON'dan Veri Aktarma (transferFromJSON)
Bir JSON dosyasından verileri aktarmak için transferFromJSON metodunu kullanabilirsiniz.
#### Kullanım:
```js
await db.transferFromJSON('./eskiVeritabani.json');
```
#### Açıklama:
- **transferFromJSON(sourceFilePath: string):** Belirtilen JSON dosyasındaki verileri mevcut veritabanına aktarır.
  - Eğer transfer edilen veriler diziyse, mevcut dizilerle birleştirilir.
  - Eğer veriler nesneyse, mevcut nesnelerle derinlemesine birleştirme yapılır.
  - Veri tipi uyumsuzsa, ilgili anahtar atlanır ve uyarı verilir.
---
### Operasyon Gerçekleştirme (operate)
Belirli bir işlemi gerçekleştirmek için operate metodunu kullanabilirsiniz:
#### Kullanım:
```js
// Örnek 1: Diziye eleman ekleme
await db.operate('item1', { $push: { user: 'Ali', review: 'Harika!' } }, 'reviews'); 
// 'reviews' dizisine Ali'nin incelemesini ekler.

// Örnek 2: Diziye eleman çıkarma
await db.operate('item1', { $unpush: { user: 'Ali', review: 'Harika!' } }, 'reviews'); 
// 'reviews' dizisinden Ali'nin incelemesini çıkarır.

// Örnek 3: Sayısal değeri artırma
await db.operate('item1', { $add: 100 }, 'price'); 
// 'item1' için price değerini 100 artırır.

// Örnek 4: Sayısal değeri azaltma
await db.operate('item1', { $subtract: 50 }, 'price'); 
// 'item1' için price değerini 50 azaltır.
```
#### Açıklama:
<details>
<summary>Operasyon Türleri</summary>
  
- **$push:** Diziye eleman ekler.
- **$unpush:** Dizi üzerinden eleman çıkarır.
- **$add:** Sayısal değeri artırır.
- **$subtract:** Sayısal değeri azaltır.
    
</details>

- **operate(key: string, operation: object, subkey?: string):** Anahtar üzerinde çeşitli işlemler yapar:
  - **key:** İşlemin yapılacağı anahtar (veritabanında mevcut olmalıdır).
  - **operation:** Yapılacak işlemi belirten nesne (örneğin: { $push: {...} }).
  - **subkey (isteğe bağlı):** Alt anahtar, eğer anahtarın içinde alt bir nesne varsa kullanılır.
---
### Tüm Anahtarları Getirme (getAll)
Veritabanındaki tüm anahtar ve değerleri almak için getAll fonksiyonunu kullanabilirsiniz:

### Kullanım:
```js
const allData = await db.getAll();
console.log('Tüm veriler:', allData);
```
#### Açıklama:
- **getAll():** Veritabanındaki tüm anahtar ve değerleri döner.
---
### Veritabanını Temizleme (clear)
Tüm veritabanını temizlemek için clear metodunu kullanabilirsiniz:
#### Kullanım:
```js
await db.clear();
```
#### Açıklama:
- **clear():** Veritabanındaki tüm verileri siler ve boş bir duruma getirir.
---
## Olası Hata Türleri
SryaBot DB içerisinde karşılaşılabilecek hata türleri şu şekildedir:
- **InvalidTypeError:** Bir anahtar için beklenen tür ile uyuşmayan bir değer sağlandığında fırlatılır.
- **KeyNotFoundError:** Belirtilen anahtar veritabanında bulunamadığında fırlatılır.
- **AddOperationError:** Sayısal olmayan bir anahtara ekleme yapılmaya çalışıldığında fırlatılır.
- **DatabaseClearError:** Veritabanını temizleme işlemi sırasında bir hata oluştuğunda fırlatılır.
- **PushOperationError:** Dizi olmayan bir anahtara eleman eklenmeye çalışıldığında fırlatılır.
- **UnpushOperationError:** Dizi olmayan bir anahtardan eleman çıkarılmaya çalışıldığında fırlatılır.
- **SubtractOperationError:** Sayısal olmayan bir anahtardan çıkarma yapılmaya çalışıldığında fırlatılır.
- **MissingDatabaseOptionError:** Gerekli bir veritabanı seçeneği sağlanmadığında fırlatılır.
---
## Lisans
[MIT Lisansı](./LICENSE) ile sunulmuştur.
