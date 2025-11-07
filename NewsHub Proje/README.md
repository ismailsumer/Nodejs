
## NewsHub - Haber & Blog Platformu 

Bu proje, Node.js ve TypeScript kullanılarak geliştirilmiş, hem REST API hem de EJS tabanlı sunucu taraflı render (SSR) arayüzü sunan tam kapsamlı bir haber ve blog platformudur. Proje, kurumsal projelerde kullanılan katmanlı mimari (MVC) yapısını temel alır22.

## 🎯 Proje Amacı
Projenin temel amacı, modern backend teknolojilerini kullanarak kapsamlı bir uygulama geliştirmektir. Bu kapsamda JWT tabanlı kimlik doğrulama, session yönetimi, Swagger ile API dokümantasyonu, MongoDB modelleme ve ilişkileri, veri doğrulama (validation) ve global hata yönetimi (global error handling) gibi konular pratik olarak ele alınmıştır3.API Dokümantasyonu (Swagger): http://localhost:3000/api-docs 

## ✨ Özellikler

### Genel
- Katmanlı Mimari: Skaalası genişletilebilir ve bakımı kolay MVC yapısı 
 - Çift Kimlik Doğrulama:
 - REST API için JWT (JSON Web Token) tabanlı koruma
 - EJS arayüzü için Session tabanlı oturum yönetimi.
 - Veri Doğrulama: Joi ile tüm kullanıcı girdilerinin sunucu tarafında doğrulanması.
 - Merkezi Hata Yönetimi: Tüm hataların tek bir Global Error Handler ile yönetilmesi
 - API Dokümantasyonu: Swagger (OpenAPI) ile tüm API endpoint'lerinin belgelenmesi.

###  Kullanıcı Rolleri:
 - Admin: Tüm kullanıcıları ve içerikleri (post, yorum) yönetebilir.
 - User: Sisteme kayıt olabilir, giriş yapabilir, kendi postlarını oluşturabilir, güncelleyebilir, silebilir ve diğer postlara yorum yapabilir.
 ### Fonksiyonellik
- Post Yönetimi: Kullanıcıların haber/blog yazısı oluşturması, düzenlemesi, silmesi ve listelemesi.
 - Yorum Yönetimi: Kullanıcıların postlara yorum ekleyebilmesi. Yorumların sadece admin veya post sahibi tarafından silinebilmesi.

## 🛠️ Kullanılan Teknolojiler
- Backend: Node.js, Express.js, TypeScript
- View Engine: EJS (Embedded JavaScript) 
- Veritabanı: MongoDB + Mongoose (ODM) 
- Kimlik Doğrulama: JSON Web Token (JWT) , Express-session 
- Parola Güvenliği: bcryptjs 
- API Dokümantasyonu: Swagger (swagger-ui-express, swagger-jsdoc) 
- Veri Doğrulama: Joi 22


## 📁 Proje Yapısı

```
NewsHub/
├── src/
│   ├── config/
│   │   ├── db.ts              # MongoDB bağlantısı
│   │   ├── cryptoJS.ts        # Şifreleme fonksiyonları
│   │   └── swagger.ts         # Swagger yapılandırması
│   ├── controllers/
│   │   ├── authController.ts  # Kimlik doğrulama
│   │   ├── newsController.ts  # Haber işlemleri
│   │   ├── commentController.ts # Yorum işlemleri
│   │   └── adminController.ts # Admin işlemleri
│   ├── middlewares/
│   │   ├── authMiddleware.ts  # JWT doğrulama
│   │   ├── sessionAuthMiddleware.ts # Session doğrulama
│   │   ├── roleMiddleware.ts  # Rol kontrolü
│   │   ├── uploadMiddleware.ts # Dosya yükleme
│   │   └── errorHandler.ts    # Global hata yönetimi
│   ├── models/
│   │   ├── userModel.ts       # Kullanıcı şeması
│   │   ├── newsModel.ts       # Haber şeması
│   │   ├── commentModel.ts    # Yorum şeması
│   │   └── result.ts          # Response şablonu
│   ├── routes/
│   │   ├── authRoutes.ts      # Auth endpoint'leri
│   │   ├── newsRoutes.ts      # News endpoint'leri
│   │   ├── commentRoutes.ts   # Comment endpoint'leri
│   │   ├── adminRoutes.ts     # Admin endpoint'leri
│   │   └── viewRoutes.ts      # View (EJS) route'ları
│   ├── utils/
│   │   ├── jwtUtility.ts      # JWT fonksiyonları
│   │   ├── eRoles.ts          # Rol enum'ları
│   │   └── AppError.ts        # Custom error sınıfları
│   ├── validations/
│   │   ├── authValidator.ts   # Auth validation
│   │   ├── newsValidator.ts   # News validation
│   │   ├── commentValidator.ts # Comment validation
│   │   └── index.ts           # Validation middleware
│   ├── app.ts                 # Express app yapılandırması
│   └── server.ts              # Server başlatma
├── views/
│   ├── layouts/
│   │   └── main.ejs           # Ana layout
│   ├── partials/
│   │   ├── header.ejs         # Header
│   │   ├── footer.ejs         # Footer
│   │   └── flash.ejs          # Flash mesajları
│   ├── pages/
│   │   ├── home.ejs           # Ana sayfa
│   │   ├── login.ejs          # Giriş
│   │   ├── register.ejs       # Kayıt
│   │   ├── profile.ejs        # Profil
│   │   ├── news-detail.ejs    # Haber detay
│   │   ├── create-news.ejs    # Haber oluştur
│   │   ├── my-news.ejs        # Haberlerim
│   │   └── admin.ejs          # Admin paneli
│   └── errors/
│       ├── 404.ejs            # 404 sayfası
│       ├── 403.ejs            # 403 sayfası
│       └── 500.ejs            # 500 sayfası
├── public/
│   ├── css/
│   │   └── style.css          # Custom CSS
│   ├── js/
│   │   └── app.js             # Client-side JS
│   └── images/                # Statik görseller
├── uploads/                   # Yüklenen dosyalar
├── .env                       # Ortam değişkenleri
├── package.json
├── tsconfig.json
└── README.md
```

---


## 📦 Kurulum

### Gereksinimler
- Node.js (v18+)
- MongoDB (v6+)
- npm veya yarn

### 1. Projeyi İndirin
```bash
git clone https://github.com/your-username/newshub.git
cd newshub
```

### 2. Bağımlılıkları Kurun
```bash
npm install
```

### 3. Ortam Değişkenlerini Ayarlayın
`.env` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017
DB_NAME=newshub

# Crypto Configuration (Şifreleme için)
CRYPTO_SECRET_KEY=UFYC634V78J6XI788G51K9444KL03637

# JWT Configuration (Token için)
JWT_SECRET=A7B9D4F2E8C1G5H3J6K8L0M9N2P4Q7R1S3T5U8V0W2X4Y6Z9
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

# Session Configuration (EJS oturum yönetimi için)
SESSION_SECRET=B8C0E5G7I9K2M4O6Q8S1U3W5Y7Z9A2C4E6G8I0K2M4O6Q8S0
```

### 4. MongoDB'yi Başlatın
```bash
# Windows
mongod

# Mac/Linux
sudo systemctl start mongod
```

### 5. Uygulamayı Çalıştırın

#### Development Modu
```bash
npm run dev
```

#### Production Modu
```bash
npm run build
npm start
```

Uygulama çalıştıktan sonra:
- **Frontend:** http://localhost:3000
- **API Docs:** http://localhost:3000/api-docs

---
