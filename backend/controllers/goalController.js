// Importing the Schema for CRUD operations
const Goal = require('../models/goalModel')
const asyncHandler = require('../middleware/errorHandler')
exports.createGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please provide a text')
  }
  const goal = await Goal.create({
    text: req.body.text,
  })
  res.status(200).json({
    message: ' goal created',
    goal,
  })
})

exports.getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find()
  res.status(200).json({
    message: 'All Goals fetched',

    goals,
  })
})

exports.getGoal = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: 'goal fetched',
  })
})

exports.updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  if (!goal) {
    res.status(404)
    throw new Error('goal not found')
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }))

  res.status(200).json({
    message: 'goal updated',
    updatedGoal,
  })
}

exports.deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  if (!goal) {
    res.status(404)
    throw new Error('goal not found')
  }
  await goal.remove()

  res.status(200).json({
    id: req.params.id,
  })
})
