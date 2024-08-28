import bcryptjs from "bcryptjs";
import { request } from "express";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";

export const login = async (req = request, res = response) => {
    const { username, password } = req.body;
    const user = await User.findOne({username});
    
    if(!user) return res.status(400).json({ msg: `Username (${username}) Not found` });
    if(!user.active) return res.status(400).json({ msg: `Username (${username}) Not active` }); 
    
    if(!bcryptjs.compareSync( password, user.password ))
        return res.status(400).json({ msg: 'Invalid username or password'}); 

    const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SIGN_KEY, { expiresIn: '4h' })

    res.json({token});
}