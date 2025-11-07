NewsHub - Haber & Blog PlatformuBu proje, Node.js ve TypeScript kullanılarak geliştirilmiş, hem REST API hem de EJS tabanlı sunucu taraflı render (SSR) arayüzü sunan tam kapsamlı bir haber ve blog platformudur. Proje, kurumsal projelerde kullanılan katmanlı mimari (MVC) yapısını temel alır22.🎯 Proje AmacıProjenin temel amacı, modern backend teknolojilerini kullanarak kapsamlı bir uygulama geliştirmektir. Bu kapsamda JWT tabanlı kimlik doğrulama, session yönetimi, Swagger ile API dokümantasyonu, MongoDB modelleme ve ilişkileri, veri doğrulama (validation) ve global hata yönetimi (global error handling) gibi konular pratik olarak ele alınmıştır3.API Dokümantasyonu (Swagger): http://localhost:3000/api-docs 4✨ ÖzelliklerGenelKatmanlı Mimari: Skaalası genişletilebilir ve bakımı kolay MVC yapısı5555.Çift Kimlik Doğrulama:REST API için JWT (JSON Web Token) tabanlı koruma6.EJS arayüzü için Session tabanlı oturum yönetimi7.Veri Doğrulama: Joi ile tüm kullanıcı girdilerinin sunucu tarafında doğrulanması8888.Merkezi Hata Yönetimi: Tüm hataların tek bir Global Error Handler ile yönetilmesi9999.API Dokümantasyonu: Swagger (OpenAPI) ile tüm API endpoint'lerinin belgelenmesi10.Kullanıcı RolleriAdmin: Tüm kullanıcıları ve içerikleri (post, yorum) yönetebilir11.User: Sisteme kayıt olabilir, giriş yapabilir, kendi postlarını oluşturabilir, güncelleyebilir, silebilir ve diğer postlara yorum yapabilir12121212.FonksiyonellikPost Yönetimi: Kullanıcıların haber/blog yazısı oluşturması, düzenlemesi, silmesi ve listelemesi13.Yorum Yönetimi: Kullanıcıların postlara yorum ekleyebilmesi. Yorumların sadece admin veya post sahibi tarafından silinebilmesi14.🛠️ Kullanılan TeknolojilerBackend: Node.js, Express.js, TypeScript 15View Engine: EJS (Embedded JavaScript) 16Veritabanı: MongoDB + Mongoose (ODM) 17Kimlik Doğrulama: JSON Web Token (JWT) 18, Express-session 19Parola Güvenliği: bcryptjs 20API Dokümantasyonu: Swagger (swagger-ui-express, swagger-jsdoc) 21Veri Doğrulama: Joi 22📂 Proje MimarisiProje, sorumlulukların ayrılması (Separation of Concerns) ilkesine dayalı katmanlı bir mimariye sahiptir.src/
├── config/         # Veritabanı, Swagger gibi yapılandırma dosyaları
├── controllers/    # İstekleri karşılayan ve cevapları düzenleyen katman
├── middlewares/    # Auth, validation, error handler gibi ara yazılımlar
├── models/         # Mongoose veritabanı şemaları (modeller)
├── routes/         # Endpoint tanımlamalarının yapıldığı katman
├── services/       # İş mantığı ve veritabanı operasyonlarının yönetildiği katman
├── validations/    # Joi doğrulama şemaları
├── views/          # EJS arayüz dosyaları (.ejs)
│   └── partials/   # Tekrar eden EJS parçaları (header, footer)
├── types/          # TypeScript tip genişletmeleri (d.ts)
├── app.ts          # Express uygulamasının ana yapılandırma dosyası
└── server.ts       # Sunucuyu başlatan dosya
🚀 Kurulum ve BaşlatmaProjeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin.GereksinimlerNode.js (v16 veya üstü)MongoDB (yerel veya bulut üzerinde, örn: MongoDB Atlas)AdımlarProjeyi klonlayın
cd NewsHub
Gerekli paketleri yükleyin:Bashnpm install
.env (Ortam Değişkenleri) Dosyasını Oluşturun: 23Projenin ana dizininde .env adında bir dosya oluşturun ve aşağıdaki içeriği kendi bilgilerinize göre doldurun:Ini, TOML# Sunucu Ayarları
PORT=3000

# MongoDB Bağlantı Adresi
MONGODB_URI=mongodb://localhost:27017/NewsHub

# Güvenlik Anahtarları (Bu değerleri mutlaka değiştirin!)
JWT_SECRET=BU_COK_GIZLI_BIR_ANAHTARDIR_DEGISTIRIN
SESSION_SECRET=BU_DA_COK_GIZLI_BIR_SESSION_ANAHTARIDIR
Uygulamayı Geliştirme Modunda Başlatın:Bu komut, TypeScript dosyalarını anında derler ve dosyalarda yapılan her değişiklikte sunucuyu otomatik olarak yeniden başlatır.Bashnpm run dev
Uygulamayı Production Modunda Başlatın:Önce TypeScript kodunu JavaScript'e derleyin, sonra derlenmiş kodu çalıştırın.Bash# 1. Adım: Projeyi derle (dist/ klasörü oluşacak)
npm run build

# 2. Adım: Derlenmiş uygulamayı başlat
npm run start
Uygulama artık http://localhost:3000 adresinde çalışıyor olacaktır.📝 API Endpoint ÖzetleriTüm API endpoint'leri /api/v1 ön eki ile çalışır. Detaylı dokümantasyon için Swagger adresini ziyaret edin.MetodEndpointAçıklamaYetki GerekliPOST/auth/registerYeni kullanıcı kaydı oluşturur. 24HayırPOST/auth/loginKullanıcı girişi yapar ve JWT üretir. 25HayırGET/auth/profileGiriş yapan kullanıcının bilgilerini getirir. 26Evet (JWT)GET/postsTüm postları listeler.HayırPOST/postsYeni bir post oluşturur.Evet (JWT)POST/posts/:postId/commentsBir posta yorum ekler.Evet (JWT)