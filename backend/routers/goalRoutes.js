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

/** create a goal routes */
router.route('/api/goals').post(createGoal)

/** get a goal routes */
router.route('/api/goal/:id').get(getGoal)

/** get all goals routes */
router.route('/api/goals').get(getGoals)

/** update a goal routes */
router.route('/api/goal/:id').put(updateGoal)

/** delete a goal routes */
router.route('/api/goal/:id').delete(deleteGoal)

/** exporting the routes */
module.exports = router
