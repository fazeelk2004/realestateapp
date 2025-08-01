import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from "path"

dotenv.config();                                                      // LOADING ENVIRONMENT VARIABLES FROM .env FILE 

const app = express();                                                // CREATING AN EXPRESS APPLICATION   
if(process.env.NODE_ENV !== "production"){
  app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow credentials (cookies) to be sent
  }));
}
const __dirname = path.resolve()
app.use(express.json());                                              //MIDDLEWARE TO PARSE JSON REQUEST BODIES
app.use(cookieParser());                                              //MIDDLEWARE TO PARSE COOKIES
app.use("/api/user", userRouter);                                     // MIDDLEWARE TO HANDLE USER ROUTES
app.use("/api/auth", authRouter);                                     // MIDDLEWARE TO HANDLE AUTH ROUTES
app.use("/api/listing", listingRouter);                               // MIDDLEWARE TO HANDLE LISTING ROUTES
if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname,"../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
mongoose.connect(process.env.MONGO).then(() => {                      // CONNECTING TO MONGODB USING MONGOOSE
  console.log('MongoDB Connected');
    app.listen(3001, () => {                                          // STARTING THE SERVER ON PORT 3001
    console.log('Server Is Running On Port 3001');
  });
}).catch((err) => {
  console.error('MongoDB Connection Error:', err);
});
app.use((err, req, res, next) => {                                    // MIDDLEWARE TO HANDLE ERRORS
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
})