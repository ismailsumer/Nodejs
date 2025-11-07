import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0', // OpenAPI standardı sürümü
        info: {
            title: 'NewsHub API', // Proje adı
            version: '1.0.0',
            description: 'NewsHub - Haber & Blog Platformu için REST API dokümantasyonu',
            contact: {
                name: 'Proje Sahibi',
                email: 'info@example.com',
            },
        },
        servers: [ // API'nin çalıştığı sunucu adresleri
            {
                url: `http://localhost:${process.env.PORT || 3000}/api/v1`,
                description: 'Geliştirme Sunucusu',
            },
        ],
        // JWT için güvenlik şeması tanımı
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter "Bearer" [space] and then your token.',
                },
            },
        },
        // Korumalı rotalarda bu güvenliği zorunlu kıl
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    // API dokümantasyonunun nerede (hangi dosyalarda) aranacağını belirtir
    // Rota dosyalarımızı (JSDoc formatında) okuyacak
    // Development ve production ortamları için dosya yollarını destekle
    apis: [
        './src/routes/*.ts',  // Development (TypeScript)
        './dist/routes/*.js'  // Production (Derlenmiş JavaScript)
    ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;