import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
	const hashedPassword = bcryptjs.hashSync(password, 10);
	const newUser = new User({username, email, password: hashedPassword});
	try{
		await newUser.save()
		res.status(201).json("USER CREATED SUCCESSFULLY");
	} catch(error){
		// Check if it's a duplicate key error
		if (error.code === 11000) {
			// Check which field caused the duplicate key error
			const duplicateField = Object.keys(error.keyPattern)[0];
			
			if (duplicateField === 'username') {
				return res.status(400).json({
					success: false,
					message: "Username Already Exists"
				});
			} else if (duplicateField === 'email') {
				return res.status(400).json({
					success: false,
					message: "Email Already Exists"
				});
			}
		}
		next(error);
	}
};

export const signin = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const validUser = await User.findOne({ email });
		if (!validUser) {
			return next(errorHandlerndler(404, "User Not Found"));
		}
		const isPasswordValid = bcryptjs.compareSync(password, validUser.password)
		if (!isPasswordValid) {
			return next(errorHandler(400, "Wrong Credentials!"));
		}
		const token = jwt.sign({ id: validUser._id}, process.env.JWT_SECRET);
		const { password: pass, ...rest} = validUser._doc;
		res.cookie("Access_Token", token, { httpOnly: true }).status(200).json(rest)
	} catch (error) {
		next(error);
	}
};