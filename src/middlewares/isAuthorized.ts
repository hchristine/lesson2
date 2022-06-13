import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../payload/jwtPayload';

export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.status(403).send();
        return;
    }

    jwt.verify(req.headers.authorization, process.env.SECRET!, (error, decoded) => {
        if (error) {
            res.status(400).send();
            return;
        }
        req.admin = decoded as JwtPayload;
        next();
    })
}