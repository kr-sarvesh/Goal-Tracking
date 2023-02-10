// Importing the Schema for CRUD operations

exports.createGoal = async (req, res) => {
  res.status(200).json({
    message: ' goal created',
  })
}

exports.getGoals = async (req, res) => {
  res.status(200).json({
    message: 'All Goals fetched',
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
