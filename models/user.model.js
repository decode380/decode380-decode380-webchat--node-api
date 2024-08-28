import { model, Schema } from "mongoose";

const userSchema = new Schema({
    username: String,
    password: String,
    active: { type: Boolean, default: true },
});

userSchema.methods.toJSON = function() {
    const { _id, __v, ...user} = this.toObject();
    return user;
}

export const User = model('User', userSchema); 
