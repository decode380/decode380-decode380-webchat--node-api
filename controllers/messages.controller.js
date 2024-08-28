import { request, response } from "express";

import { Message } from "../models/message.model.js";
import { AppServer } from "../server.js";
import { decodeToken } from "../helpers/jwt.helper.js";

export const getMessagesByChatId = (req = request, res = response) => {
    const chatId = req.params.id;
    res.status(200).json({chatId});
}

export const insertMessage = async(req = request, res = response) => {

    try {
        const message = req.body;
        const token = req.headers['authorization'];
        const { id: senderId } = await decodeToken(token);

        const errorOnModel = messageModelError(message);
        if (errorOnModel) throw new Error(errorOnModel);

        const newMessage = new Message({ ...message, senderId });

        AppServer.io
            .to(newMessage.receiverId.toString())
            .emit('receive_msg', {
                id: newMessage._id.toString(),
                message: newMessage.message, 
                from: newMessage.senderId.toString()
            });

        await newMessage.save();
        return res.status(200).json({id: newMessage._id});

    } catch (error) {
        return res.status(400).json({errors: [error.message]});
    }

}


const messageModelError = (model) => {

    if(!model.hasOwnProperty('receiverId')) return 'receiverId is required';
    if(!model.hasOwnProperty('message')) return 'message is required';
    
    return null;
}