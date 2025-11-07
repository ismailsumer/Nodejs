// src/types/express-session.d.ts
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    // Session'a kaydetmek istediğimiz kullanıcı verisinin yapısı
    user: {
      _id: string;
      username: string;
      email: string;
      role: 'User' | 'Admin';
    };
  }
}