import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";


interface Payload{
    sub: string
}

export function isAuthenticated(
    req: Request, res: Response, netx: NextFunction
) {
    
    const authtoken = req.headers.authorization;

    if(!authtoken) {
        return res.status(401).end();
    }

    const [, token] = authtoken.split(" ");

    try {
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload;

        req.user_id = sub;

        return netx();
    } catch (error) {
        return res.status(401).end();
    }
}