import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import AdminModel from "../model/admin";
import jwt from "jsonwebtoken"

const prisma = new PrismaClient();

const login = async (req : Request, res : Response) => {
    const { email, password } = req.body;
    const isVer = AdminModel.safeParse({email, password});
    console.log(isVer);
    if(!isVer.success) return res.json({ msg: "Provided input is invalid" });

    try {
        const isAdmin = await prisma.admin.findFirst({
            where : {
                email,
                password
            }
        })
        // console.log(Admin);
        if(!isAdmin) return res.status(401).json({mes : "Invalid Credentials"});
        //Admin details are verified
        const token = jwt.sign({id : isAdmin.id},process.env.SECRET_KEY as string);
        res.cookie("token", token);
        return res.json("Admin Logged in");
    } catch (e) {
        return res.status(401).json({mes : "Admin not found"});
    }
}


const allproduct = async (req : Request, res : Response) => {
    try {
        const products = await prisma.product.findMany({})
        console.log(products);
        return res.json({allproduct : products});
    } catch (e) {
        console.log(e);
        return res.status(404).json(e);
    }
}

const updateproduct = async (req : Request, res : Response) => {
    const { id }:any = req.params;
    const {datas} = req.body;
    // console.log(id);
    try {
        const product = await prisma.product.update({
            where : { id },
            data : {...datas}
        });
        return res.json("product updated");
    } catch (e) {
        return res.json("product code is wrong");
    }
}

const deleteproduct = async (req : Request, res : Response) => {
    const { id }:any = req.params;
    try {
        const product = await prisma.product.delete({
            where : { id }
        });
        // console.log(product);
        return res.json("product deleted");
    } catch (e) {
        return res.json("product code is wrong");
    }
}


export {
    login,
    allproduct,
    updateproduct,
    deleteproduct
}