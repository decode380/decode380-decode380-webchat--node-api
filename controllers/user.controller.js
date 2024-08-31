import bcryptjs from "bcryptjs";
import { request, response } from "express";

import { User } from "../models/user.model.js";
import { decodeToken } from "../helpers/jwt.helper.js";

export const createUser = async(req = request, res = response) => {
    const { username, password: strPassword } = req.body;

    const existedUser = User.findOne({username}); 
    if(existedUser) return res.status(400).json({errors: ["User already exist"]});

    const salt = bcryptjs.genSaltSync(10);
    const password = bcryptjs.hashSync(strPassword, salt);
    
    const user = new User({ username, password });
    await user.save();
    res.json(user._id);
};

export const getUsers = async(req = request, res = response) => {
    const token = req.headers['authorization'];
    const {id: userId} = await decodeToken(token);
    const users = await User.find({
        $and: [
            { active: true }, 
            { _id: {$ne:userId} }
        ]
    });
    const responseUsers = users.map(({_id, username}) => ({_id, username}));


    res.json({users: responseUsers});
}