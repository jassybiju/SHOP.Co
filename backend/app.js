import express, { urlencoded } from "express";
import "./utils/env.js";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import adminUserManagementRouter from "./routes/admin/user-management.routes.js";
import brandManagementRouter from './routes/admin/brand-management.routes.js'
import categoryManagementRouter from './routes/admin/category-management.routes.js'
import productManagementRouter from './routes/admin/product-managment.routes.js'
import HomeRouter from './routes/home.routes.js'
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const PORT = process.env.PORT || 8000;
const app = express();

app.use(morgan("dev"));

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
// client.on('error',(error)=>console.log(1 , error))

//  await client.connect()
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(req.url);
    next();
});

app.use("/api/auth", authRouter);
app.use("/api/admin/user-management", adminUserManagementRouter);
app.use("/api/admin/brand", brandManagementRouter);
app.use("/api/admin/category", categoryManagementRouter);
app.use("/api/admin/product", productManagementRouter);

app.use('/api/home',HomeRouter)

app.use((req, res) => {
    res.status(404);
    throw new Error("PAth not found " + req.path);
});

app.use((error, req, res , next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    console.log(statusCode, 12);
    res.status(statusCode);
    console.log(error.message);
    res.json({
        message: error.message,
        status: "error",
    });
});

app.listen(PORT, () => {
    connectDB();
    console.log(`listening to port ${PORT}`);
});
