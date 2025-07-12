import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();                                                      // LOADING ENVIRONMENT VARIABLES FROM .env FILE 

mongoose.connect(process.env.MONGO).then(() => {                      // CONNECTING TO MONGODB USING MONGOOSE
  console.log('MongoDB Connected');
}).catch((err) => {
  console.error('MongoDB Connection Error:', err);
});

const app = express();                                                // CREATING AN EXPRESS APPLICATION

app.use(express.json());                                              //MIDDLEWARE TO PARSE JSON REQUEST BODIES

app.listen(3000, () => {                                              // STARTING THE SERVER ON PORT 3000
  console.log('Server Is Running On Port 3000');
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