const expressAsyncHandler = require("express-async-handler");
const Users = require("../Models/user");
const jwt = require("jsonwebtoken");

const register = expressAsyncHandler(async (req, res, next) => {
  try {
    const user = new Users(req.body);
    await user.save();
    res.status(200).json("User Created Successfully Now Please Login");
  } catch (error) {
    next(error);
  }
});

const login = expressAsyncHandler(async (req, res, next) => {
  const username = req.body.username;
  const pass = req.body.password;
  try {
    if (!username) {
      res.status(401).json("Username is Required");
    }
    if (!pass) {
      res.status(401).json("Password is Required");
    }
    const user = await Users.findOne({ username: username });
    if (!user) {
      res.status(404).json("User Not Found");
    }
    console.log(user)
    const isPasswordCorrect = await user.comparePassword(pass);
    if (!isPasswordCorrect) {
      return next("Password is not correct");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...otherDetails } = user._doc;
    res
      .cookie("user_token", token, {
        httpOnly: true,
      })
      .status(201)
      .json({ ...otherDetails });
  } catch (error) {
    next(error);
  }
});

const resetPassword = expressAsyncHandler(async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id);
    console.log(user);
    const updatePassword = Users.findByIdAndUpdate(
      req.params.id,
      { password: req.body.password },
      { new: true }
    );
    res.status(200).json({ msg: "Password updated successfully.", data: user });
  } catch (error) {
    next(error);
  }
});

const deleteUser = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  try {
    await Users.findByIdAndDelete(id);
    res.status(200).json("User Deleted Successfully");
  } catch (error) {
    next(error);
  }
});

const logout = expressAsyncHandler(async (req, res, next) => {
  try {
    
    res.clearCookie('user_token').status(200).json("Logged Out successfully");
    res.end()
  } catch (error) {
    next(error);
  }
});

module.exports = { register, login, deleteUser, resetPassword, logout };
