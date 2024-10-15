import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import AdminModel from "../model/admin";
import jwt from "jsonwebtoken"

const prisma = new PrismaClient();

const login = async (req : Request, res : Response) => {
    const { email, password } = req.body;
    const isVer = AdminModel.safeParse({email, password});
    // console.log(isVer);
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
        return res.json({data : isAdmin});
    } catch (e) {
        return res.status(401).json({mes : "Admin not found"});
    }
}



const allproduct = async (req : Request, res : Response) => {
    try {
        const products = await prisma.product.findMany({})
        // console.log(products);
        return res.json({allproduct : products});
    } catch (e) {
        console.log(e);
        return res.status(404).json(e);
    }
}

const createProduct = async (req : Request, res : Response) => {
    const {datas} = req.body;
    try {
        const product = await prisma.product.create({
            data : {...datas}
        });
        return res.json({datas});
    } catch (e) {
        // console.log(e);
        return res.json("error occured while creating the product");
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


const allOrders = async (req : Request, res : Response) => {
    try {
        const orders = await prisma.order.findMany({
            include : {
                user : true
            }
        })
        // console.log(orders);
        return res.json({orders});
    } catch (e) {
        console.log(e);
        return res.status(404).json(e);
    }
}

const orderStatus = async (req : Request, res : Response) => {
    const { id } = req.params;
    const { status } = req.body;
    // console.log(id, status);
    try {
        const order = await prisma.order.update({
            where : { id },
            data : { status }
        });
        return res.json({order});
    } catch (e) {
        return res.json("order code is wrong");
    }
}

const specificOrder = async (req : Request, res : Response) => {
    const { id } = req.params;
    try {
        const order = await prisma.order.findFirst({
            where : {
                id
            },
            include : {
                user : true,
                product : true
            }
        })
        return res.json({order});
    } catch (e) {
        // console.log(e);
        return res.status(404).json(e);
    }
}

const users = async (req : Request, res : Response) => {
    try {
        const users = await prisma.user.findMany({
            include : {
                orders : true
            }
        })
        // console.log(users);
        return res.json({users});
    } catch (e) {
        // console.log(e);
        return res.status(404).json(e);
    }
}

const specificUser = async (req : Request, res : Response) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findFirst({
            where : {
                id 
            },
            include : {
                orders : true
            }
        })
        // console.log(user);
        return res.json({user});
    } catch (e) {
        // console.log(e);
        return res.status(404).json(e);
    }
}


const deleteUser = async (req : Request, res : Response) => {
    const { userId } = req.body;
    // console.log(userId);
    try {
        const user = await prisma.user.delete({
            where : {
                id : userId
            }
        })
        // console.log(user);
        return res.json("user deleted");
    } catch (e) {
        // console.log(e);
        return res.status(404).json(e);
    }
}


export {
    login,
    allproduct,
    createProduct,
    updateproduct,
    deleteproduct,
    allOrders,
    specificOrder,
    users,
    specificUser,
    deleteUser,
    orderStatus
}