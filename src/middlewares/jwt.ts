import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
    //Get the jwt token from the head
    const token = <string>req.headers["Authorization"];
    let jwtPayload: any;

    //Try to validate the token and get data
    try {
        jwtPayload = <any>jwt.verify(token, process.env.JWT_SECRET);

        //user verify code here, for verify token with correct user

        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        res.status(401).json('You are not authorized');
        return;
    }
};