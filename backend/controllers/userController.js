const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
/*
 * @desc    Register a new user
 */
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please enter all fields')
  }
  // check if the user already exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  // Hash the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  // Create a new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})
/**
 * @desc    Login user
 */
exports.loginUser = asyncHandler(async (req, res) => {
  // checking for the email and password
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error('Please enter all fields')
  }
  // check if the user exists
  const user = await User.findOne({ email })
  //comparing the plain password and the hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    // res.json({
    //   _id: user._id,
    //   name: user.name,
    //   email: user.email,
    //   token: generateToken(user._id),
    // })

    // If you want to use cookies
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    }
    res
      .status(200)
      .cookie('token', generateToken(user._id), options)
      .json({
        success: true,
        token: generateToken(user._id),
        user,
      })
    console.log('user is id and _id' + user._id)
  } else {
    throw new Error('Invalid email or password')
  }
})

exports.getMe = asyncHandler(async (req, res) => {
  console.log('hello')
  const { _id, name, email } = await User.findById(req.user.id)
  res.status(200).json({
    id: _id,
    name,
    email,
  })
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}
