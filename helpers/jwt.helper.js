import jwt from "jsonwebtoken";

export const decodeToken = async(token) => {
    return new Promise( (resolve, reject) => {
        if (!Boolean(token)) reject('Token no provided')   
        jwt.verify(token, process.env.JWT_SIGN_KEY, (err, decoded) => {
            if (err) reject('Invalid token');
            else resolve(decoded);
        });
    });
}