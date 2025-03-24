import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { connectDb } from './config/dbConnection.js'
import userRouter from './routes/user.js'
import adminRouter from './routes/admin.js'
import cors from 'cors'
import logger from "morgan";
import cookieParser from 'cookie-parser'
import { fileURLToPath } from "url";
import errorHandler from './middlewares/errorHandler.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()
dotenv.config()
app.use(logger('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173'],

}));

app.use(adminRouter)
app.use(userRouter)
app.use(errorHandler);
app.listen(5000, () => {
    connectDb()
    console.log('server started')
})