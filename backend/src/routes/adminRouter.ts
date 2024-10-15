import { RequestHandler, Router } from 'express'
import adminMiddleware from '../middleware/adminMiddleware';
import { allOrders, allproduct, createProduct, deleteproduct, deleteUser, login, orderStatus, specificOrder, specificUser, updateproduct, users } from '../controllers/adminController';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const adminRouter = Router();


adminRouter.post("/login", login as any);

adminRouter.use(adminMiddleware as RequestHandler);

adminRouter.get("/products", allproduct as any);
adminRouter.post("/addproduct", createProduct as any);
adminRouter.put("/product/:id", updateproduct as any);
adminRouter.delete("/product/:id", deleteproduct as any);

adminRouter.get("/orders", allOrders as any );
adminRouter.get("/order/:id", specificOrder as any );
adminRouter.post("/editorder/:id", orderStatus as any );

adminRouter.get("/users", users as any );
adminRouter.post("/user/:id", specificUser as any );
adminRouter.post("/user/delete", deleteUser as any )

const check = async ( req:any, res:any ) => {
    const { id } = req.body;
    
    const user = await prisma.admin.findFirst({
        where : {
            id
        }
    })
    return res.json({user})
}

adminRouter.get("/admincheck", adminMiddleware as any, check )


export default adminRouter;