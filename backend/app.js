import "./utils/env.js";
import express, { urlencoded } from "express";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import adminUserManagementRouter from "./routes/admin/user-management.routes.js";
import brandManagementRouter from './routes/admin/brand-management.routes.js'
import categoryManagementRouter from './routes/admin/category-management.routes.js'
import productManagementRouter from './routes/admin/product-managment.routes.js'
import orderManagementRouter from './routes/admin/order-management.routes.js'
import stockManagementRouter from './routes/admin/stock-management.routes.js'
import homeRouter from './routes/home.routes.js'
import accountRouter from './routes/account.routes.js'
import cartRouter from './routes/cart.routes.js'
import checkoutRouter from './routes/user/checkout.routes.js'
import orderRouter from './routes/user/order.routes.js'
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import ErrorWithStatus from "./config/ErrorWithStatus.js";
import { HTTP_RES } from "./utils/CONSTANTS.js";
const PORT = process.env.PORT || 8000;
const app = express();

app.use(morgan("dev"));

app.use(
    cors({
        origin:true,
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
app.use('/api/admin/order', orderManagementRouter)
app.use('/api/admin/stock',stockManagementRouter)

app.use('/api/home',homeRouter)

app.use('/api/account', accountRouter)

app.use('/api/cart', cartRouter)

app.use('/api/checkout', checkoutRouter)
app.use('/api/order', orderRouter)


app.use((req, res) => {
    // res.status(404);
    throw new ErrorWithStatus("PAth not found " + req.path, HTTP_RES.NOT_FOUND);
});

app.use((error, req, res , next ) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    console.log(statusCode, 12 , error.statusCode());

    res.status(error.statusCode() || statusCode);
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
