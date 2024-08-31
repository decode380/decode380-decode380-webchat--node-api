import { request, response } from "express";

import { decodeToken } from "../helpers/jwt.helper.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { AppServer } from "../server.js";
import { isMongoDBId } from "../helpers/mongo-id.helper.js";

export const getMessagesByChatId = async (req = request, res = response) => {
    const userId = req.params.id;

    if(!isMongoDBId(userId)) return res.status(400).json({ errors: ['UserId provided is not valid id'] })
    const user = await User.findOne({_id: userId});
    if(!user) return res.status(400).json({ errors: ['User cannot found'] })

    const query = {
        $or: [
            { senderId: userId },
            { receiverId: userId },
        ]
    }

    Message.find(query)
        .then( messages => {
            res.status(200).json({messages});
        })
        .catch( error => res.status(500).json({errors: [error]}) );

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
                _id: newMessage._id.toString(),
                message: newMessage.message, 
                senderId: newMessage.senderId.toString(),
                receiverId: message.receiverId
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