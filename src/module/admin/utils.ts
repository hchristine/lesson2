import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../../payload/jwtPayload';

const secret = process.env.SECRET;
if (!secret) {
    throw new Error("Where is your JWT secret?")
}

export function sendToken(res: Response, payload: JwtPayload) {
    jwt.sign(payload, secret!, {
        expiresIn: "10d"
    }, (error, token) => {
        if (error) {
            res.status(500).send();
        } else {
            res.json({
                token
            });
        }
    });
} 