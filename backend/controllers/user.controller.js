import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const test = (req, res) => {
  res.send('User test route');
}



export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) return next(errorHandler(403, "You Can Only Update Your Own Account!" ));
  try {
    if (req.body.password && req.body.currentpassword) {
      const user = await User.findById(req.params.id);
      const isPasswordValid = bcryptjs.compareSync(req.body.currentpassword, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Current Password Is Incorrect!"
        });
      }
      req.body.password = await bcryptjs.hashSync(req.body.password, 10);
    }
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
        phoneNo: req.body.phoneNo,
        country: req.body.country,
        gender: req.body.gender,
      }
    }, {new: true})

    const {password, ...rest} = updateUser._doc;
    res.status(200).json({
      message: "User Updated Successfully!",
      user: rest
    });
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req, res, next) => {
  if(req.user.id !== req.params.id) return next(errorHandler(403, "You Can Only Delete Your Own Account!" ));
  try{
    await User.findByIdAndDelete(req.params.id)
    res.clearCookie('access_token');
    res.status(200).json("USER HAS BEEN DELETED!")
  }catch(error){
    next(error);
  }
}