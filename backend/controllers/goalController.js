// Importing the Schema for CRUD operations
const Goal = require('../models/goalModel')

exports.createGoal = async (req, res) => {
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
}

exports.getGoals = async (req, res) => {
  const goals = await Goal.find()
  res.status(200).json({
    message: 'All Goals fetched',

    goals,
  })
}

exports.getGoal = async (req, res) => {
  res.status(200).json({
    message: 'goal fetched',
  })
}

exports.updateGoal = async (req, res) => {
  res.status(200).json({
    message: `goal got updated is ${req.params.id}`,
  })
}

exports.deleteGoal = async (req, res) => {
  res.status(200).json({
    message: `Goal got deleted `,
  })
}
