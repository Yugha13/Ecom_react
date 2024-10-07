import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const adminMiddleware = async (req : Request, res : Response, next : NextFunction) => {
    const { token } = req.cookies;
    if(!token) return res.json({msg : "Login to view this page"});
    try {
        const { id }:any = jwt.verify(token,process.env.SECRET_KEY as string);
        if(!id) throw new Error("not found");
        const isUser = await prisma.user.findUnique({
            where : {id}
        });
        if(!isUser) throw new Error("not found");
        req.body.id = isUser.id;
        next();
    } catch (e) {
        return res.json({msg : "Admin Verification Failed. Try to Login again."})
    }
}

export default adminMiddleware;