import { model, Schema } from "mongoose";

const messageSchema = Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    message: { type: String, required: true },
});

export const Message = model('message', messageSchema);