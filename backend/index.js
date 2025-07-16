import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();                                                      // LOADING ENVIRONMENT VARIABLES FROM .env FILE 

const app = express();                                                // CREATING AN EXPRESS APPLICATION   

app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json());                                              //MIDDLEWARE TO PARSE JSON REQUEST BODIES

mongoose.connect(process.env.MONGO).then(() => {                      // CONNECTING TO MONGODB USING MONGOOSE
  console.log('MongoDB Connected');
    app.listen(3000, () => {                                          // STARTING THE SERVER ON PORT 3000
    console.log('Server Is Running On Port 3000');
  });
}).catch((err) => {
  console.error('MongoDB Connection Error:', err);
});

app.use("/api/user", userRouter);                                     // MIDDLEWARE TO HANDLE USER ROUTES
app.use("/api/auth", authRouter);                                     // MIDDLEWARE TO HANDLE AUTH ROUTES
app.use((err, req, res, next) => {                                    // MIDDLEWARE TO HANDLE ERRORS
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
})