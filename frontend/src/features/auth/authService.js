//This service is strictly for making http request and sending databack and setting any data in local storage

import axios from 'axios'

const API_URL = 'http://localhost:5000/api/users/'

//Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)
  if (response.data) {
    //response.data will iclude the user object and the token
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}
const authService = {
  register,
}
export default authService
