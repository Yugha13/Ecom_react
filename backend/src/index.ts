import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

import userRouter from "./routes/userRouter"; 
import adminRouter from "./routes/adminRouter";

const app = express();

app.use(express.json());
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true,
}));

app.use(cookieParser());

app.use("/api/v1/user", userRouter );

app.use("/api/v1/admin", adminRouter );


const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log("listening to port",PORT);
})