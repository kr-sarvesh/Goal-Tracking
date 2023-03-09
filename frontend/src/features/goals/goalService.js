import axios from 'axios'
const API_URL = '/api/goals'

//create new goal
const createGoal = async (goalData) => {
  const response = await axios.post(API_URL, goalData)
  return response.data
}

const getGoals = async () => {
  const response = await axios.get(API_URL)
  return response.data
}
//delete user goal
const deleteGoals = async (goalId) => {
  const response = await axios.get(API_URL, goalId)
  return response.data
}

const goalService = { createGoal, getGoals, deleteGoals }
export default goalService
