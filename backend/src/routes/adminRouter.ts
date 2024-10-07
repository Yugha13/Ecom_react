import { RequestHandler, Router } from 'express'
import adminMiddleware from '../middleware/adminMiddleware';
import { allproduct, deleteproduct, login, updateproduct } from '../controllers/adminController';


const adminRouter = Router();


adminRouter.post("/login", login as any);

adminRouter.use(adminMiddleware as RequestHandler);

adminRouter.get("/products", allproduct as any);
adminRouter.put("/product/:id", updateproduct as any);
adminRouter.delete("/product/:id", deleteproduct as any);



export default adminRouter;