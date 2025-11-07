import { Schema, model, Document, Types } from 'mongoose';

// Post dökümanının TypeScript arayüzü (interface)
export interface IPost extends Document {
    title: string;
    content: string;
    author: Types.ObjectId; // User modeline bir referans (ilişki)
    comments: Types.ObjectId[]; // Comment modeline bir referans dizisi
}

// Mongoose şeması
const PostSchema = new Schema<IPost>({
    title: {
        type: String,
        required: [true, 'Başlık alanı zorunludur.'],
        trim: true,
    },
    content: {
        type: String,
        required: [true, 'İçerik alanı zorunludur.'],
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Mongoose'a bu alanın 'User' modeline ait bir ID tuttuğunu söylüyoruz.
        required: true,
    },
    comments: [ // Bir postun birden çok yorumu olabileceği için dizi olarak tanımlıyoruz.
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment' // Bu alanlar 'Comment' modeline ait ID'ler tutacak.
        }
    ]
}, {
    timestamps: true // createdAt ve updatedAt alanlarını otomatik ekler
});

const Post = model<IPost>('Post', PostSchema);
export default Post;