//Importing the express to define the routes
const express = require('express')
const router = express.Router()
const {
  createGoal,
  getGoals,
  getGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalController')

const { protect } = require('../middleware/authMiddleware')

/** create a goal routes */
router.route('/api/goals').post(protect, createGoal)

/** get a goal routes */
router.route('/api/goal/:id').get(protect, getGoal)

/** get all goals routes */
router.route('/api/goals').get(protect, getGoals)

/** update a goal routes */
router.route('/api/goal/:id').put(protect, updateGoal)

/** delete a goal routes */
router.route('/api/goal/:id').delete(protect, deleteGoal)

/** exporting the routes */
module.exports = router
