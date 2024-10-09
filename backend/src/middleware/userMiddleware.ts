import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userMiddleware = async (req : Request, res : Response, next : NextFunction) => {
    const {token} = req.cookies;
    // console.log(token, "token");

    if(!token) return res.status(400).json({mes: "this"})
    try {
        const { id }:any = jwt.verify(token, process.env.SECRET_KEY as string);
        if(!id) throw new Error("not found");
        const isUser = await prisma.user.findUnique({
            where : {id}
        });
        if(!isUser) throw new Error("not found");
        req.body.userId = isUser.id;
        next();
    } catch (e) {
        return res.status(400).json({msg : "User Verification Failed. Try to Login again."})
    }
}

export default userMiddleware;