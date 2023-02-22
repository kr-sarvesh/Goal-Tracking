const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
router.route('/api/users').post(registerUser)
router.route('/api/users/login').post(loginUser)
router.route('/api/users/getme').get(protect, getMe)

module.exports = router
