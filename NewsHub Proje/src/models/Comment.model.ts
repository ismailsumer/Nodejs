import { Schema, model, Document, Types } from 'mongoose';

// Comment dökümanının TypeScript arayüzü
export interface IComment extends Document {
    text: string;
    author: Types.ObjectId; // Yorumu yapan User'a referans
    post: Types.ObjectId;   // Yorumun yapıldığı Post'a referans
}

// Mongoose şeması
const CommentSchema = new Schema<IComment>({
    text: {
        type: String,
        required: [true, 'Yorum metni zorunludur.'],
        trim: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    }
}, {
    timestamps: true
});

const Comment = model<IComment>('Comment', CommentSchema);
export default Comment;