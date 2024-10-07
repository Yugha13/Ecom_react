import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import userModel from "../model/user";
import jwt from "jsonwebtoken"

const prisma = new PrismaClient();

const login = async (req : Request, res : Response) => {
    const { email, password } = req.body;
    const isVer = userModel.safeParse({ email });
    // console.log(isVer.error);
    if(!isVer.success) return res.json({ msg: "Provided input is invalid" });
    
    try {
        // console.log(email);
        const isUser = await prisma.user.findUnique({
            where : {
                email,
                password
            }
        })
        // console.log(isUser);
        if(!isUser) return res.status(401).json({mes : "Invalid Credentials"});
        //user details are verified
        const token = jwt.sign({id : isUser.id},process.env.SECRET_KEY as string);
        res.cookie("token", token);
        return res.json({user : isUser});
    } catch (e) {
        return res.status(401).json({mes : "User not found"});
    }
}

const signup = async (req : Request, res : Response) => {
    const { email, password, name }: any = req.body; 
    const isVer = userModel.safeParse({ email, password, name });
    // console.log(isVer);
    if (!isVer.success) return res.json({ msg: "Provided input is invalid" });
    try {
        const user = await prisma.user.create({
            data: {
                email,
                password,
                name
            }
        });
        // console.log(user);
        return res.json("User Created");
    } catch (e) {
        // console.log(e);
        return res.status(401).json({mes : "User already exist"});
    }
}


const allproduct = async (req : Request, res : Response) => {
    try {
        const products = await prisma.product.findMany({})
        // console.log(products);
        return res.json({allproduct : products});
    } catch (e) {
        // console.log(e);
        return res.status(404).json(e);
    }
}

const productId = async (req : Request, res : Response) => {
    const { id }:any = req.params;
    console.log(id);
    try {
        const product = await prisma.product.findFirst({
            where : { id }
        });
        console.log(product);
        return res.json({details : product});
    } catch (e) {
        return res.json("product code is wrong");
    }
}

const createCart = async (req : Request, res : Response) => {
    const { id }:any = req.params;
    const { userId }: any = req.body; 
    try {
        const cart = await prisma.cart.create({
            data: {
                userId,
            }
        });
    } catch (e) {
        //pass
    }
    const updatedCart = await prisma.cart.update({
        where: {
            userId
        },
        data: {
            products: {
                connect: {
                    id
                }
            }
        }
    });
    // console.log(product);
    return res.json({mes: "new product created", updatedCart});
}

const viewCart = async (req : Request, res : Response) => {
    const { userId } = req.body;
    try {
        const product = await prisma.cart.findMany({
            where : {
                userId
            },
            include : {
                products : true
            }
        })
        // console.log(products);
        return res.json({Cart : product});
    } catch (e) {
        // console.log(e);
        return res.status(404).json(e);
    }
}

const createOrder = async (req : Request, res : Response) => {
    const { productId, totalAmount, userId }: any = req.body; 
    try {
        const product = await prisma.order.create({
            data: {
                userId,
                totalAmount,
                product : {
                    connect: {
                        id: productId
                    }
                }
            }
        });
        // console.log(product);
        return res.json("Order placed");
    } catch (e) {
        return res.json("product code is wrong");
    }
}


const viewOrders = async (req : Request, res : Response) => {
    const { userId } = req.body;
    try {
        const products = await prisma.order.findMany({
            where : {
                userId
            }
        })
        // console.log(products);
        return res.json({Orders : products});
    } catch (e) {
        // console.log(e);
        return res.status(404).json(e);
    }
}

const createWishlist = async (req : Request, res : Response) => {
    const {id}:any = req.params;
    const { userId }: any = req.body; 
    try {
        await prisma.wishlist.create({
            data : {
                userId
            }
        })
    } catch (e) {
        //pass
    }
    const updatedlist = await prisma.wishlist.update({
        where : {
            userId
        },
        data : {
            products : {
                connect : {
                    id
                }
            }
        }
    });
    console.log(updatedlist);
    return res.json("wishlist Updated");
}

const viewWishlist = async (req : Request, res : Response) => {
    const { userId }: any = req.body; 
    try {
        const product = await prisma.wishlist.findMany({
            where : {
                userId
            }
        });
        // console.log(product);
        return res.json({products : product});
    } catch (e) {
        return res.json("UserId doesn't match");
    }
}




export {
    login,
    signup,
    allproduct,
    productId,
    createCart,
    viewCart,
    createOrder,
    viewOrders,
    createWishlist,
    viewWishlist
}