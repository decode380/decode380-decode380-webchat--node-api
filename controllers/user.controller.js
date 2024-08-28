import bcryptjs from "bcryptjs";
import { request, response } from "express";

import { User } from "../models/user.model.js";

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