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
    // console.log(id);
    try {
        const product = await prisma.product.findFirst({
            where : { id }
        });
        // console.log(product);
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
    const {userId, totalAmount, ids} = req.body;
    // console.log(ids);
    
    try {
        const orders = await prisma.order.create({
            data : {
                user: {
                    connect: {id:userId}
                },
                totalAmount,
                product : {
                    connect: ids.map((i:any) => ({id: i}))
                }
            },
        })
        await prisma.cart.deleteMany({
            where : {
                userId
            }
        });
        return res.status(200).json({orderPlaced : orders});
    } catch (e) {
        console.log(e);
        return res.status(404).json(e);
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
    // console.log(updatedlist);
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

const deleteCart = async (req : Request, res : Response) => {
    const { id }: any = req.params;
    const { userId }: any = req.body; 
    try {
        const delProduct = await prisma.cart.update({
            where: {
                userId
            },
            data: {
                products: {
                    disconnect: {
                        id
                    }
                }
            }
        });
        // console.log(delProduct);
        return res.json("Product has been Deleted");
    } catch (e) {
        return res.json("UserId doesn't match");
    }
}

const deleteWishlist = async (req: Request, res: Response) => {
    const { id }: any = req.params;
    const { userId }: any = req.body; 
    try {
        const updatedWishlist = await prisma.wishlist.update({
            where: {
                userId,
            },
            data: {
                products: {
                    disconnect: {
                        id
                    }
                }
            }
        });
        // console.log(updatedWishlist);
        return res.json("Product has been Deleted from Wishlist");
    } catch (e) {
        return res.json("UserId doesn't match or Product not found");
    }
}

const saveLater = async (req: Request, res: Response) => {
    const { id }: any = req.params; 
    const { userId }: any = req.body;
    
    try {
        const cartItem = await prisma.cart.findFirst({
            where: {
                userId,
                products: {
                    some: {
                        id
                    }
                }
            },
            include: {
                products: true
            }
        });

        if (!cartItem) {
            return res.status(404).json({ error: "Product not found in cart." });
        }

        const productToMove = cartItem.products.find((p: any) => p.id == id);

        if (!productToMove) {
            return res.status(404).json({ error: "Product not found in cart." });
        }

        await prisma.wishlist.upsert({
            where: { userId },
            update: {
                products: {
                    connect: {
                        id: productToMove.id
                    }
                }
            },
            create: {
                userId,
                products: {
                    connect: {
                        id: productToMove.id
                    }
                }
            }
        });

        await prisma.cart.update({
            where: {
                id: cartItem.id,
            },
            data: {
                products: {
                    disconnect: { id: productToMove.id }
                }
            }
        });

        return res.json({ message: "Product has been moved to Wishlist and removed from Cart" });
    } catch (e) {
        console.error("Error moving product:", e);
        return res.status(500).json({ error: "An error occurred while moving the product" });
    }
}
  
const addToCart = async (req: Request, res: Response) => {
    const { id }: any = req.params; 
    const { userId }: any = req.body;
    
    try {
        const cartItem = await prisma.wishlist.findFirst({
            where: {
                userId,
                products: {
                    some: {
                        id
                    }
                }
            },
            include: {
                products: true
            }
        });

        if (!cartItem) {
            return res.status(404).json({ error: "Product not found in cart." });
        }

        const productToMove = cartItem.products.find((p: any) => p.id == id);

        if (!productToMove) {
            return res.status(404).json({ error: "Product not found in wishlist." });
        }

        await prisma.cart.upsert({
            where: { userId },
            update: {
                products: {
                    connect: {
                        id: productToMove.id
                    }
                }
            },
            create: {
                userId,
                products: {
                    connect: {
                        id: productToMove.id
                    }
                }
            }
        });

        await prisma.wishlist.update({
            where: {
                id: cartItem.id,
            },
            data: {
                products: {
                    disconnect: { id: productToMove.id }
                }
            }
        });

        return res.json({ message: "Product has been moved to Cart and removed from Wishlist" });
    } catch (e) {
        console.error("Error moving product:", e);
        return res.status(500).json({ error: "An error occurred while moving the product" });
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
    viewWishlist,
    deleteCart,
    deleteWishlist,
    saveLater,
    addToCart
}