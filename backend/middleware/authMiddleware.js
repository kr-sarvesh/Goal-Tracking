const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

// protect function
const protect = asyncHandler(async (req, res, next) => {
  // console.log('cookies is ' + req.cookies.token)
  //Get token
  const token =
    req.cookies.token ||
    req.header('Authorization').replace('Bearer ', '') ||
    req.body.token
  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
  console.log('token is : ' + token)

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // getting the user from the token
    req.user = decoded
  } catch (error) {
    res.status(401)
    throw new Error('Not authorized, token failed')
  }

  // // Get user from the Token
  // req.user = await User.findById(decoded.id).select('-password')
  // console.log('req.user is' + req.user.id)
  return next()
})
module.exports = { protect }
