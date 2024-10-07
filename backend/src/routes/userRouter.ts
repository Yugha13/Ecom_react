import { Router } from 'express'
import { 
    allproduct, 
    productId, 
    login, signup, 
    viewOrders, 
    viewWishlist, 
    createWishlist, 
    createCart, 
    viewCart, 
    createOrder, 
    saveLater, 
    deleteWishlist, 
    deleteCart, 
    addToCart
} from '../controllers/userController';
import userMiddleware from '../middleware/userMiddleware';


const userRouter = Router();


userRouter.post("/login", login as any );
userRouter.post("/signup", signup as any );

userRouter.get("/products", allproduct as any );
userRouter.get("/products/:id", userMiddleware as any, productId as any );

userRouter.post("/product/:id/wishlist", userMiddleware as any, createWishlist as any );
userRouter.post("/product/:id/cart", userMiddleware as any, createCart as any );

userRouter.get("/wishlist", userMiddleware as any, viewWishlist as any );
userRouter.post("/delwishlist/:id", userMiddleware as any, deleteWishlist as any );

userRouter.get("/cart", userMiddleware as any, viewCart as any );
userRouter.post("/delcart/:id", userMiddleware as any, deleteCart as any );

userRouter.post("/savelater/:id", userMiddleware as any, saveLater as any );
userRouter.post("/addcart/:id", userMiddleware as any, addToCart as any );

userRouter.get("/cart/order", userMiddleware as any, createOrder as any );
userRouter.get("/history", userMiddleware as any, viewOrders as any );



export default userRouter;