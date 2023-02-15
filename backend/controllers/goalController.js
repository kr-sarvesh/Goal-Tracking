const asyncHandler = require('express-async-handler')
// Importing the Schema for CRUD operations
const Goal = require('../models/goalModel')
//Importing the user model so that one user can't delete another user's goal
const User = require('../models/userModel')
// @desc    Create a goal
exports.createGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please provide a text')
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  })
  res.status(200).json({
    message: ' goal created',
    goal,
  })
})

// @desc    Get all goals
exports.getGoals = asyncHandler(async (req, res) => {
  //importing the user id from the token
  const goals = await Goal.find({ user: req.user.id })
  res.status(200).json({
    goals,
  })
})
// @desc    Get a goal
exports.getGoal = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: 'goal fetched',
  })
})
// @desc    Update a goal
exports.updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  if (!goal) {
    res.status(404)
    throw new Error('goal not found')
  }
  const user = await User.findById(req.user.id)
  //check for the user
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  //Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not authorized')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json({
    message: 'goal updated',
    updatedGoal,
  })
})
// @desc    Delete a goal
exports.deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  if (!goal) {
    res.status(404)
    throw new Error('goal not found')
  }

  const user = await User.findById(req.user.id)

  //check for the user
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  //Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not authorized')
  }

  await goal.remove()

  res.status(200).json({
    id: req.params.id,
  })
})
