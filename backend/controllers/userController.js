const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const asyncHandler = require('../middleware/errorHandler')
exports.registerUser = asyncHandler(async (req, res) => {
  res.json({
    message: 'Register User',
  })
})
exports.loginUser = asyncHandler(async (req, res) => {
  res.json({
    message: 'Login User',
  })
})
exports.getMe = asyncHandler(async (req, res) => {
  res.json({
    message: 'Get Me',
  })
})
