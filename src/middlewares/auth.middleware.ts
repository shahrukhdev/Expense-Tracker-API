import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtUserPayload } from "../types/jwt.js";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {

    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer "))
        {
            return res.status(401).json({
                "status": false,
                "message": "Unauthorized."
            });
        }
        
        const token = authHeader.split(" ")[1];

        if(!token) {
            return res.status(401).json({
                "status": false,
                "message": "Token missing."
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtUserPayload;

        req.user = decoded;

        next();

    } catch(error) {
        return res.status(401).json({
            "status": false,
            "message": "Invalid or expired token."
        });
    }

};